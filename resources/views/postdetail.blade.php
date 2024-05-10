@extends('layout')

@section('content')
    <div class="main-content pb-4">
        <div class="container pt-4">
            <div class="row px-md-5 px-sm-0 mx-2">
                <div class="col-md-8 col-sm-12">
                    <div class="w-100 images-carousel shadow">
                        @foreach ($post->images as $image)
                            <div class="images-carousel-cell flex justify-center">
                                <img class="w-full h-full rounded" src="{{ $image->url }}" alt="">
                            </div>
                        @endforeach
                    </div>
                    <div class="bg-light rounded shadow mt-5">
                        <div class="py-4 px-5">
                            <h4 class="font-bold text-3xl mb-3 text-primary text-center">{{ $post->title }}</h4>
                            <div class="post-info">
                                <div class="flex justify-between mb-2 text-success pt-2">
                                    <p class="text-sm text-start mb-0"><i class="bi bi-clock"></i>
                                        {{ $post->created_at }}</p>
                                    <p class="text-sm text-center mb-0"><i class="bi bi-eye"></i> {{ $post->views }}
                                        Lượt xem</p>
                                    <p class="text-sm text-center mb-0"><i class="bi bi-person-heart"></i>
                                        {{ $post->interests }} Quan tâm</p>
                                </div>
                                <div class="flex flex-wrap mb-2 font-bold text-primary border-t pt-2">
                                    <p class="mb-0 mr-3"><i class="fa-solid fa-ruler"></i> Diện tích:
                                        {{ $post->acreage }}m2</p>
                                    @foreach ($post->services as $service)
                                        <p class="mb-0">{!! html_entity_decode($service->icon) !!} {{ $service->services_name }} </p>
                                    @endforeach
                                </div>
                                <p class="mb-2 font-bold text-primary text-sm"><i class="fa-solid fa-location-dot me-1"></i> Địa
                                    chỉ: {{ $post->ward->ward_name }},
                                    {{ $post->district->district_name }}, Tỉnh Thái Nguyên.
                                </p>
                                <div class="py-2 border-t">
                                    <p class="font-bold mb-1">Nội dung bài viết:</p>
                                    <p class="card-text whitespace-pre-line">{{ $post->description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
