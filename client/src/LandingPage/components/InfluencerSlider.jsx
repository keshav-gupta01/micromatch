import React, { useState, useEffect } from "react";
import Slider from "react-slick";

const InfluencerSlider = () => {
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
      verified: true,
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
      verified: true,
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
      verified: false,
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
      verified: true,
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
      verified: true,
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
      verified: true,
    },
  ];

  const formatNumber = (num) =>
    num >= 1_000_000
      ? (num / 1_000_000).toFixed(1) + "M"
      : num >= 1_000
      ? (num / 1_000).toFixed(1) + "K"
      : num.toString();

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 500) {
        setCardsPerView(1);
      } else if (window.innerWidth < 768) {
        setCardsPerView(2);
      } else if (window.innerWidth < 1200) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const settings = {
    infinite: true,
    speed: 6000,
    slidesToShow: cardsPerView,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    dots: false,
    variableWidth: false,
  };

  const VerifiedIcon = () => (
    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-yellow-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-fade-in">
              Our Top Influencers
            </h2>
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-expand"></div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4 font-medium animate-slide-up">
            Connect with our network of talented creators who can help grow your brand
          </p>
        </div>

        <div className="relative px-4">
          <Slider {...settings}>
            {influencers.map((influencer, index) => (
              <div key={influencer.id} className="px-3 py-2">
                <div 
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 animate-card-entry"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-300/2 to-purple-300/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  
                  {/* Image container with overlay effects */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={influencer.imageUrl}
                      alt={influencer.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => (e.target.src = "/api/placeholder/300/300")}
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    
                    {/* Floating stats on hover */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                      <span className="text-xs font-semibold text-gray-800">⭐ {influencer.engagement}%</span>
                    </div>

                    {/* Category badge */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                      <span className="text-xs font-medium text-indigo-600">{influencer.category}</span>
                    </div>
                  </div>

                  <div className="p-5 relative z-20">
                    {/* Name and verification */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {influencer.name}
                      </h3>
                      {influencer.verified && (
                        <div className="animate-bounce-in">
                          <VerifiedIcon />
                        </div>
                      )}
                    </div>

                    {/* Stats with animation */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                        <p className="font-bold text-lg text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                          {formatNumber(influencer.followers)}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">Followers</p>
                      </div>
                      <div className="text-center transform group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '0.1s' }}>
                        <p className="font-bold text-lg text-gray-900 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                          {influencer.engagement}%
                        </p>
                        <p className="text-xs text-gray-500 font-medium">Engagement</p>
                      </div>
                      <div className="text-center transform group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '0.2s' }}>
                        <p className="font-bold text-lg text-gray-900 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                          {influencer.posts}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">Posts</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-5 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                      {influencer.bio}
                    </p>

                    {/* CTA Button with enhanced animation */}
                    <a
                      href={influencer.profileUrl}
                      className="block w-full text-center py-3 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 transform group-hover:shadow-lg group-hover:shadow-purple-500/25 hover:scale-105 active:scale-95 relative overflow-hidden"
                    >
                      <span className="relative z-10">View Profile</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </a>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm text-white"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes card-entry {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }

        .animate-expand {
          animation: expand 1.5s ease-out 0.8s both;
        }

        .animate-card-entry {
          animation: card-entry 0.8s ease-out both;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom slider styles */
        .slick-track {
          display: flex;
          align-items: stretch;
        }

        .slick-slide {
          height: auto;
        }

        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default InfluencerSlider;