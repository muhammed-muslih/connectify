"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createVerifySubscription = exports.getUserSummary = exports.changePassword = exports.verifyPassword = exports.getFollowersAndFollowingsDetails = exports.removeUserProfile = exports.editUserProfile = exports.getSavedPostDetails = exports.changeUserStatus = exports.allUsers = exports.getUserSavedPosts = exports.saveUnSavePosts = exports.unFollowUser = exports.followAndUnfollowUser = exports.findUser = exports.userSearch = void 0;
const httpStatus_1 = require("@interfaces/httpStatus");
const appError_1 = __importDefault(require("@utils/appError"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const userModel_1 = __importDefault(require("@frameworks/database/mongoDb/models/userModel"));
const stripe_1 = __importDefault(require("@utils/stripe"));
const [oneMonth, sixMonth, oneYear] = [
    "price_1NkMfQSCmxHQJtz0u0NZ7QbO",
    "price_1NkNjGSCmxHQJtz0pDGZRAa9",
    "price_1NkTtvSCmxHQJtz0mXXxLvoG",
];
const userSearch = async (query, userRepository) => {
    const seacrhUsers = await userRepository.searchUser(query);
    return seacrhUsers;
};
exports.userSearch = userSearch;
const findUser = async (id, userRepository) => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (user.verified?.isVerified) {
        const session = await stripe_1.default.checkout.sessions.retrieve(user.verified?.subscribe);
        if (session.payment_status === 'paid' && session.subscription) {
            const subscription = await stripe_1.default.subscriptions.retrieve(session.subscription.toString());
            if (subscription.status === "canceled") {
                const updatedVerifiedData = {
                    isVerified: false,
                };
                await userModel_1.default.findOneAndUpdate({ _id: id }, { $set: { verified: updatedVerifiedData } });
            }
        }
    }
    return user;
};
exports.findUser = findUser;
const followAndUnfollowUser = async (userId, followedUserId, userRepository) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const validFollowedUserId = new mongoose_1.default.Types.ObjectId(followedUserId);
    const isFollowed = user.followings.includes(validFollowedUserId);
    if (!isFollowed) {
        await userRepository.addUserInFollowingList(userId, followedUserId);
        await userRepository.addUserInFollowersList(userId, followedUserId);
        return {
            message: "followed successfully",
        };
    }
    else {
        await userRepository.removeUserFromFollowingList(userId, followedUserId);
        await userRepository.removeUserFromFollowersList(userId, followedUserId);
        return {
            message: "unfollowed successfully",
        };
    }
};
exports.followAndUnfollowUser = followAndUnfollowUser;
const unFollowUser = async (userId, unFollowUserId, userRepository) => {
    await userRepository.removeUserFromFollowingList(userId, unFollowUserId);
    await userRepository.removeUserFromFollowersList(userId, unFollowUserId);
    return {
        message: "unfollowed successfully",
    };
};
exports.unFollowUser = unFollowUser;
const saveUnSavePosts = async (userId, postId, userRepository) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("User not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const validPostId = new mongoose_1.default.Types.ObjectId(postId);
    const isSaved = user.saved.includes(validPostId);
    let message;
    if (isSaved) {
        await userRepository.removeSavedPost(userId, postId);
        message = "post unsaved successfully";
    }
    else {
        await userRepository.SavePosts(userId, postId);
        message = "post saved successfully";
    }
    return message;
};
exports.saveUnSavePosts = saveUnSavePosts;
const getUserSavedPosts = async (userId, userRepository) => {
    const saved = await userRepository.getSavedPost(userId);
    if (!saved) {
        throw new appError_1.default("Could not find saved post", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return saved;
};
exports.getUserSavedPosts = getUserSavedPosts;
const allUsers = async (userRepository) => {
    const users = await userRepository.getAllUsers();
    return users;
};
exports.allUsers = allUsers;
const changeUserStatus = async (userId, userRepository) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const status = !user.isBlocked;
    let message;
    if (status) {
        message = "user blocked successfully";
    }
    else {
        message = "user unblocked successfully";
    }
    await userRepository.blockAndUnblock(userId, status);
    return message;
};
exports.changeUserStatus = changeUserStatus;
const getSavedPostDetails = async (userId, userRepository) => {
    const saved = await userRepository.getSavedPostDetails(userId);
    return saved;
};
exports.getSavedPostDetails = getSavedPostDetails;
const editUserProfile = async (userId, name, userName, bio, userRepository, s3Service, file) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const updateFields = {};
    let result;
    if (file) {
        const postPic = false;
        result = await s3Service.uploadAndGetUrl(file, postPic);
        updateFields.profilePicture = result.url;
        updateFields.profilePicName = result.imageName;
        if (user.profilePicture && user.profilePicName) {
            await s3Service.removeFile(user.profilePicName);
        }
    }
    const isUserNameExist = await userRepository.getUserByUserName(userName);
    if (isUserNameExist && isUserNameExist._id.toString() !== userId) {
        throw new appError_1.default("userName already exists", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    updateFields.name = name;
    updateFields.userName = userName;
    updateFields.bio = bio;
    await userRepository.editUserProfile(userId, updateFields);
    return {
        url: result?.url ? result.url : user.profilePicture,
    };
};
exports.editUserProfile = editUserProfile;
const removeUserProfile = async (userId, userRepository, s3Service) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const profileName = user.profilePicName;
    if (profileName) {
        await s3Service.removeFile(profileName);
    }
    return await userRepository.removeUserProfilePic(userId);
};
exports.removeUserProfile = removeUserProfile;
const getFollowersAndFollowingsDetails = async (userId, userRepository) => {
    return await userRepository.getFollowLists(userId);
};
exports.getFollowersAndFollowingsDetails = getFollowersAndFollowingsDetails;
const verifyPassword = async (userId, password, userRepository, authServices) => {
    if (!userId) {
        throw new appError_1.default("userId is not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user is not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const isPasswordCorrect = await authServices.comparePassword(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
        throw new appError_1.default("password is incorrect", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return;
};
exports.verifyPassword = verifyPassword;
const changePassword = async (userId, password, userRepository, authServices) => {
    if (!userId) {
        throw new appError_1.default("userId is not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (!password) {
        throw new appError_1.default("credentials not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const hasedPassword = await authServices.encryptPassword(password);
    await userRepository.changePassword(userId, hasedPassword);
    return;
};
exports.changePassword = changePassword;
const getUserSummary = async (userRepository) => {
    const usersPerMonth = await userRepository.noOfUsersPerMonth();
    const usersStatus = await userRepository.getUsersStatistics();
    const usersStatistics = usersStatus[0];
    return {
        usersPerMonth,
        usersStatistics,
    };
};
exports.getUserSummary = getUserSummary;
const createVerifySubscription = async (userId, plan, userRepository) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user is not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    let planId = "";
    if (plan == 600)
        planId = oneMonth;
    else if (plan == 2000)
        planId = sixMonth;
    else if (plan == 5000)
        planId = oneYear;
    const session = await stripe_1.default.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
            {
                price: planId,
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL}/profile/${userId}?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/profile/${userId}`,
    });
    console.log(session, "session");
    return session;
};
exports.createVerifySubscription = createVerifySubscription;
const verifyPayment = async (userId, sessionId, userRepository) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new appError_1.default("user is not found", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const session = await stripe_1.default.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid" && session.subscription) {
        const subscription = await stripe_1.default.subscriptions.retrieve(session.subscription.toString());
        const startDate = moment_1.default
            .unix(subscription.current_period_start)
            .format("YYYY-MM-DD");
        const endDate = moment_1.default
            .unix(subscription.current_period_end)
            .format("YYYY-MM-DD");
        const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
        const durationInDays = moment_1.default
            .duration(durationInSeconds, "seconds")
            .asDays();
        const updatedVerifiedData = {
            isVerified: true,
            subscribe: sessionId,
            startDate,
            endDate,
            planDuration: durationInDays,
        };
        await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { verified: updatedVerifiedData } }, { upsert: true });
        return { message: "payment successfull" };
    }
    else {
        return { message: "payment failed" };
    }
};
exports.verifyPayment = verifyPayment;
