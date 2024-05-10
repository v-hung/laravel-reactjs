import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SocialShareButtons from "../components/SocialShareButtons";
import SuggestedPosts from "../components/SuggestedPosts";
import ArticleDetailSkeleton from "../components/ArticleDetailSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import usePostStore, { Post } from "../stores/post"; // Import usePostStore và Post từ file stores/post



const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [postLoading, setPostLoading] = useState(true);
    const [postError, setPostError] = useState(false);
    const [post, setPost] = useState(); // Sử dụng kiểu dữ liệu Post từ stores/post
    const { fetchPostById, selectedPost } = usePostStore();

    const { posts, fetchPosts } = usePostStore();

    useEffect(() => {
        fetchPosts(); // Gọi hàm fetchPosts để lấy danh sách bài viết khi component được render

    }, [fetchPosts]);

    // useEffect(() => {
    //     var fetchPostID = async () => {
    //         await fetchPostById(parseInt(id));
    //         setPost(selectedPost);
    //     };

    //     fetchPostID();
    // }, [id, fetchPostById]);



    var findPost = () => {
        for (let i = 0; i < posts.post.length; i++) {
            if (posts.post[i].id === parseInt(id)) {
                return posts.post[i];
            }
        }
    }
    const singlePost = findPost();

    console.log(singlePost);
    return (
        <>
            {/* {postLoading ? (
                <ArticleDetailSkeleton />
            ) : postError ? (
                <ErrorMessage message="Couldn't fetch the post data" />
            ) : ( */}
            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                <article className="flex-1">
                    <img
                        className="rounded-xl w-full"
                        src={`https://thi.kennatech.vn/storage/${singlePost.image}`}
                        alt={singlePost.title}
                    />
                    <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                        {singlePost.title}
                    </h1>
                    <div className="w-full">
                        <p>{singlePost.body.replace(/<[^>]*>?/gm, '')}</p>
                    </div>
                </article>
                <div>
                    <SuggestedPosts
                        header="Latest Article"
                        posts={posts.post}
                        className="mt-8 lg:mt-0 lg:max-w-xs"
                    />
                    <div className="mt-7 rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] p-4">
                        <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">Share on:</h2>
                        <SocialShareButtons url={encodeURI(window.location.href)} title={encodeURIComponent(singlePost.title)} />
                    </div>
                </div>
            </section>
            {/* )} */}
        </>
    );
};

export default PostDetailPage;
