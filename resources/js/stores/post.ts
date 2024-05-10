import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Fetch } from "../lib/helper";

export type Post = {
    id: number;
    author_id: string;
    category_id: string;
    title: string | null;
    excerpt: string | null;
    body: string | null;
    image: string | null;
    slug: string | null;
    meta_description: string | null;
    created_at: Date;
    updated_at: Date;
};

type State = {
    posts: Post[];
    selectedPost: Post | null;
};

type Actions = {
    fetchPosts: () => Promise<void>;
    fetchPostById: (id: number) => Promise<void>;
};

type Dispatch = {
    dispatch: (action: (state: State) => State) => void;
};

const usePostStore = create(persist<State & Actions & Dispatch>(
    (set, get) => ({
        posts: [],
        selectedPost: null,

        fetchPosts: async () => {
            const posts = await Fetch("/api/v1/posts");
            set({ posts });
        },
        // fetchPostById: async (id: number) => {
        //     try {
        //         // Kiểm tra xem bài viết đã tồn tại trong danh sách posts chưa
        //         const postInList = get().posts.find((post) => post.id === id);
        //         if (postInList) {
        //             console.log("get in list")
        //             set({ selectedPost: postInList });
        //         } else {
        //             // Nếu bài viết chưa tồn tại trong danh sách, gọi API để lấy thông tin bài viết
        //             console.log("get from api")
        //             const post = await Fetch(`/api/v1/posts/${id}`);
        //             set({ selectedPost: post });
        //         }
        //     } catch (error) {
        //         console.error("Error fetching post:", error);
        //         // Xử lý lỗi ở đây nếu cần
        //     }
        // },
        fetchPostById: async (id: number) => {
            try {
                const post = await Fetch(`/api/v1/posts/${id}`);
                set({ selectedPost: post });
            } catch (error) {
                console.error("Error fetching post:", error);
                // Xử lý lỗi ở đây nếu cần
            }
        },

        dispatch: (action) => set((state) => action(state)),
    }),
    {
        name: "post-storage",
        storage: createJSONStorage(() => localStorage),
    }
));

export default usePostStore;
