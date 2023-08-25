export interface RegisterResponseInt {
  readonly status: string;
  readonly message: string;
  readonly token: string;
  readonly _id: string;
  readonly profilePicture: string | undefined;
}

export interface GoogleResponseInt {
  readonly status: string;
  readonly message: string;
  readonly token: string;
  readonly userName: string;
  readonly _id: string;
}

export interface BasicReponse {
  status: string;
  message: string;
}

export interface SavedPostResInt {
  readonly status: string;
  saved: [string];
}

export interface UpdateProfileInterface {
  readonly status: string;
  readonly message: string;
  readonly profilePiture?: string;
}

export interface NotificationInterface {
  _id: string;
  reciever: string;
  user: {
    _id: string;
    userName: string;
    profilePicture: string;
  };
  content: string;
  postId?: {
    _id: string;
    imageUrl: string;
  };
  createdAt: string;
  isRead: boolean;
}

export interface NotificationRes {
  readonly status: string;
  readonly message: string;
  notifications: NotificationInterface[];
}

export interface UserDataAdminDashBoardInterface {
  status: string;
  message: string;
  usersPerMonth: {
    _id: {
      month: number;
    };
    count: number;
  }[]|[],
  usersStatistics:{
    _id?:string,
    totalUsers:number,
    activeUsres:number,
    blockedUsers:number,
  }
}

export interface PostsDataAdminDashBoardInterface {
  status: string;
  message: string;
  posts: {
    totalPosts: number,
    postsToday: number,
    postsThisWeek: number,
    postsThisMonth: number
  }
}
