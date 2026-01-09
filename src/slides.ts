
export interface Slide {
    id: number;
    url: string;
    title?: string;
    subtitle?: string;
    // Optional: distinct layout or color theme per slide could be added here
}

export const slides: Slide[] = [
    {
        id: 1,
        url: "/hero-funeral.jpg",
        title: "Thusanang Funeral Services",
        subtitle: "Honoring Lives with Dignity & Grace"
    },
    {
        id: 2,
        url: "/service-decor.png",
        title: "Elegant Atmospheres",
        subtitle: "Creating a peaceful sanctuary for your final goodbyes"
    },
    {
        id: 3,
        url: "/lincoln.jpg",
        title: "Executive Fleet",
        subtitle: "Professional and dignified transport for the final journey"
    },
    {
        id: 4,
        url: "/horses.png",
        title: "Distinguished Tributes",
        subtitle: "A unique and memorable farewell"
    },
    {
        id: 5,
        url: "/emperor-pecan.jpg",
        title: "The Emperor Collection",
        subtitle: "Exquisite Pecan finish for the ultimate tribute"
    },
    {
        id: 6,
        url: "/Nguni-Brown-White-Closed.jpg",
        title: "Proudly Traditional",
        subtitle: "Celebrating heritage with our exclusive Nguni range"
    },
    {
        id: 7,
        url: "/service-catering.png",
        title: "Premium Catering",
        subtitle: "Providing comfort and hospitality for your guests"
    },
    {
        id: 8,
        url: "/raised-halfview-walnut.png",
        title: "Timeless Quality",
        subtitle: "Solid craftsmanship that stands the test of time"
    },
    {
        id: 9,
        url: "/unveiling.png",
        title: "Unveiling Ceremonies",
        subtitle: "Preserving the legacy for generations to come"
    },
    {
        id: 10,
        url: "/about-img.jpg",
        title: "Compassionate Care",
        subtitle: "Walking this journey with you, every step of the way"
    }
];
