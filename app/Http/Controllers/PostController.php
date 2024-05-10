<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;



class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getSinglePost($id)
    {
        $post = Post::findOrFail($id); // Sử dụng findOrFail để trả về 404 nếu không tìm thấy bài viết
        return view('postdetail', ['post' => $post]); // Trả về view postDetail và truyền biến $post
    }
    
}
