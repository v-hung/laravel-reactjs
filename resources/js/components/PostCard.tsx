import React from "react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Post {
    id: number;
    author_id: string;
    category_id: string;
    title: string | null;
    excerpt: string | null;
    body: string | null;
    image: string;
    slug: string | null;
    meta_description: string | null;
    created_at: Date;
    updated_at: Date;
}

interface PostCardProps {
    post: Post;
    className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
    return (
        <div
            className={`rounded-xl cursor-pointer overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
        >
            <Link to={`${post.id}`}>
                <img
                    src={`https://thi.kennatech.vn/storage/${post.image}`}
                    alt="title"
                    className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                />
            </Link>
            <div className="p-5">
                <Link to={`${post.id}`}>
                    <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                        {post.title}
                    </h2>
                    <p className="text-dark-light mt-3 text-sm md:text-lg">
                        {post.meta_description}
                    </p>
                </Link>
                <div className="flex justify-between flex-nowrap items-center mt-6">
                    <div className="flex items-center gap-x-2 md:gap-x-2.5">
                        <img
                            src={"https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg"}
                            alt="post profile"
                            className="w-9 h-9 md:w-10 md:h-10 rounded-lg"
                        />
                        {/* <div className="flex flex-col">
                            <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                                {post.user.name}
                            </h4>
                            <div className="flex items-center gap-x-2">
                                <span
                                    className={`${post.user.verified ? "bg-[#36B37E]" : "bg-red-500"
                                        } w-fit bg-opacity-20 p-1.5 rounded-full`}
                                >
                                    {post.user.verified ? (
                                        <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                                    ) : (
                                        <AiOutlineClose className="w-1.5 h-1.5 text-red-500" />
                                    )}
                                </span>
                                <span className="italic text-dark-light text-xs md:text-sm">
                                    {post.user.verified ? "Verified" : "Unverified"} writer
                                </span>
                            </div>
                        </div> */}
                    </div>
                    <span className="font-bold text-dark-light italic text-sm md:text-base">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
