import React, { useState, useEffect } from "react";

const InfiniteScrollCarousel = () => {
  const [cardsPerView, setCardsPerView] = useState(4);

    const influencers = [
    {
      id: 1,
      name: "John Fornander",
      category: "Fitness & Wellness",
      imageUrl: "https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 12500,
      engagement: 4.8,
      posts: 342,
      bio: "Fitness coach sharing workout tips and healthy lifestyle inspiration.",
      profileUrl: "/influencer/alex-johnson",
    },
    {
      id: 2,
      name: "Sophia Chen",
      category: "Fashion & Style",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 38000,
      engagement: 3.6,
      posts: 567,
      bio: "Fashion blogger passionate about sustainable clothing and personal style.",
      profileUrl: "/influencer/sophia-chen",
    },
    {
      id: 3,
      name: "Marcus Wilson",
      category: "Tech & Gaming",
      imageUrl: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D",
      followers: 21500,
      engagement: 5.2,
      posts: 423,
      bio: "Tech reviewer and gaming enthusiast sharing the latest in technology.",
      profileUrl: "/influencer/marcus-wilson",
    },
    {
      id: 4,
      name: "Priya Sharma",
      category: "Travel & Adventure",
      imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D",
      followers: 52000,
      engagement: 4.3,
      posts: 684,
      bio: "Travel blogger exploring hidden gems around the world.",
      profileUrl: "/influencer/priya-sharma",
    },
    {
      id: 5,
      name: "Jordan Taylor",
      category: "Food & Cooking",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 178000,
      engagement: 6.1,
      posts: 298,
      bio: "Chef and food stylist sharing delicious recipes and cooking tips.",
      profileUrl: "/influencer/jordan-taylor",
    },
    {
      id: 6,
      name: "Emma Rodriguez",
      category: "Beauty & Skincare",
      imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      followers: 87000,
      engagement: 5.4,
      posts: 412,
      bio: "Beauty expert sharing skincare routines and makeup tutorials.",
      profileUrl: "/influencer/emma-rodriguez",
    },
    {
      id: 7,
      name: "Amara Green",
      category: "Sustainability & Eco Living",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      followers: 94000,
      engagement: 4.5,
      posts: 210,
      bio: "Eco-activist and upcycling guru inspiring conscious living and zero-waste habits.",
      profileUrl: "/influencer/amara-green",
    },
    {
      id: 8,
      name: "Benjamin Clark",
      category: "Comedy & Satire",
      imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      followers: 195000,
      engagement: 6.0,
      posts: 485,
      bio: "Digital comedian bringing laughter with daily sketches and viral parodies.",
      profileUrl: "/influencer/benjamin-clark",
    },
    {
      id: 9,
      name: "Haruka Matsui",
      category: "Art & DIY",
      imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
      followers: 57000,
      engagement: 5.7,
      posts: 367,
      bio: "Mixed-media artist and DIY creator sharing colorful tutorials and studio glimpses.",
      profileUrl: "/influencer/haruka-matsui",
    },
    {
      id: 10,
      name: "Diego Alvarez",
      category: "Tech & Gadgets",
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      followers: 128000,
      engagement: 5.2,
      posts: 249,
      bio: "Engineer turned tech educator, uncovering future gadgets and smart home hacks.",
      profileUrl: "/influencer/diego-alvarez",
    },
    {
      id: 11,
      name: "Zara Patel",
      category: "Wellness & Mindfulness",
      imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      followers: 87000,
      engagement: 4.9,
      posts: 315,
      bio: "Certified yoga instructor and mindfulness mentor promoting inner calm and self-care routines.",
      profileUrl: "/influencer/zara-patel",
    },
    {
      id: 12,
      name: "Luca Romano",
      category: "Culinary Adventures",
      imageUrl: "https://images.unsplash.com/photo-1519864602031-b1be01c49a48?auto=format&fit=crop&w=800&q=80",
      followers: 228000,
      engagement: 6.3,
      posts: 507,
      bio: "Global food explorer and fusion chef, inviting followers into kitchen adventures.",
      profileUrl: "/influencer/luca-romano",
    },
  ];


  // Duplicate for seamless loop
  const sliderItems = [...influencers, ...influencers];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 768) setCardsPerView(2);
      else if (window.innerWidth < 1024) setCardsPerView(3);
      else setCardsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatNumber = (num) =>
    num >= 1_000_000
      ? (num / 1_000_000).toFixed(1) + "M"
      : num >= 1_000
      ? (num / 1_000).toFixed(1) + "K"
      : num.toString();

  return (
    <div className="py-12 bg-[#96AED0] w-full">
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Top Influencers</h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base">
          Connect with our network of talented creators who can help grow your brand
        </p>
      </div>

      <div className="relative w-full overflow-x-hidden">
        <div
          className="flex animate-infinite-scroll w-full"
          style={{ animationPlayState: "running" }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
        >
          {sliderItems.map((influencer, index) => (
            <div
              key={`${influencer.id}-${index}`}
              className="
                flex-shrink-0
                px-3 py-2
                w-full
                max-w-xs
                md:max-w-sm
                "
            >
              <div className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col group">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-t-xl">
                  <img
                    src={influencer.imageUrl}
                    alt={influencer.name}
                    className="object-cover w-full h-full group-hover:brightness-90 transition-all duration-300"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {influencer.name}
                  </h3>
                  <p className="text-sm text-blue-600 mb-3">{influencer.category}</p>
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-600">
                    <div className="text-center bg-gray-50 rounded-md p-1">
                      <p className="font-bold text-gray-900">{formatNumber(influencer.followers)}</p>
                      <p>Followers</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-md p-1">
                      <p className="font-bold text-gray-900">{influencer.engagement}%</p>
                      <p>Engagement</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-md p-1">
                      <p className="font-bold text-gray-900">{influencer.posts}</p>
                      <p>Posts</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-3 group-hover:text-gray-700">
                    {influencer.bio}
                  </p>
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollCarousel;
