

export interface ITestimonial {
    id: string;
    rating: number;
    quote: string;
    initials: string;
    name: string;
    car: string;
}


export const testimonials: ITestimonial[] = [
        {
            id: "1",
            rating: 5,
            quote:
                "\"Velocity completely changed how I manage my garage and organize community drives. The telemetry tracking is on another level.\"",
            initials: "MS",
            name: "Marcus Steiner",
            car: "Porsche 911 GT3 RS",
        },
        {
            id: "2",
            rating: 5,
            quote:
                "\"As an event organizer, the dashboard gives me everything I need. Registration, revenue, community—all in one place.\"",
            initials: "SK",
            name: "Sofia Keller",
            car: "BMW M4 Competition",
        },
        {
            id: "3",
            rating: 5,
            quote:
                "\"The route discovery feature alone is worth it. Found roads I'd been driving past for years without knowing existed.\"",
            initials: "JH",
            name: "James Hartwell",
            car: "Mercedes-AMG GT",
        },
        {
            id: "4",
            rating: 5,
            quote:
                "\"Organizing convoys with real-time GPS positioning has brought our car club so much closer together. Essential app for any enthusiast.\"",
            initials: "AL",
            name: "Alex Laurent",
            car: "Audi R8 V10 Plus",
        },
    ];
