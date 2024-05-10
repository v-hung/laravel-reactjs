import { useEffect } from "react";
import Container from "../components/layouts/Container";
import PostCard from "../components/PostCard";
import PostCardSkeleton from "../components/PostCardSkeleton";
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import usePostStore from "../stores/post";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage"


const PostPage = () => {
    const { posts, fetchPosts } = usePostStore();
    const isLoading = false; // Thay đổi giá trị isLoading tương ứng
    const isError = false; // Thay đổi giá trị isError tương ứng

    useEffect(() => {
        fetchPosts(); // Gọi hàm fetchPosts để lấy danh sách bài viết khi component được render
    }, [fetchPosts]);
    // console.log(posts.post);

    return (
        <Container className='py-4'>
            <h5 className="text-xl font-semibold">Tài liệu</h5>

            <div className="mt-6 flex justify-between">
                <TextField label="Tìm kiếm" size='small' className='bg-white' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <span className='icon'>search</span>
                        </InputAdornment>
                    ),
                }} />

                <Button variant='contained' size='small' startIcon={<span className='icon'>add</span>} className='font-semibold'>Tìm tài liệu</Button>
            </div>

            <section className="flex flex-col w-10/12 container mx-auto px-5 py-10">
                <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                    {isLoading ? (
                        [...Array(3)].map((item, index) => (
                            <PostCardSkeleton
                                key={index}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.3333%-20px)]"
                            />
                        ))
                    ) : isError ? (
                        <ErrorMessage message="Couldn't fetch the posts data" />
                    ) : (
                        Array.isArray(posts.post) && posts.post.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                            />
                        ))

                    )}
                </div>
                <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white">
                    <span>More articles</span>
                    <FaArrowRight className="w-3 h-3" />
                </button>
            </section>
        </Container>
    )
}

export default PostPage