export interface BlogPost {
    _id: string;
    _creationTime: string | number;
    title: string;
    content: string;
    imageUrl?: string;
    categoryId: string;
    featuredPost: boolean;
    slug: string;
    userId: string;
    excerpt: string;
    views: number;
}

export interface user {
    _id: string;
    clerkId: string;
    email: string;
    imageUrl: string;
    username: string;
    _creationTime: string;

}

export interface Categories {
    _id: string;
    _creationTime: string | number;
    name: string;
    slug: string;
}

export interface Comment {
    likes?: string;
    dislikes?: string;
    _id: string;
    comments: string,
    email: string;
    name: string;
    postId: string;
    userId: string;
    _creationTime: string;
    userImg: string;
}