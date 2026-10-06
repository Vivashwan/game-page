-- Seed data. Products come from product-list.json (image URLs omitted);
-- the six products with NULL ids/rent appear on the live listing but not in that file.

INSERT INTO categories (id, slug, name, icon, sort_order) VALUES
    (1, 'gta-vi', 'GTA VI', 'pad', 1),
    (2, 'ps5-console', 'PS5 Console', 'console', 2),
    (3, 'xbox-console', 'Xbox Console', 'pad', 3),
    (4, 'vr', 'VR', 'vr', 4),
    (5, 'racing-wheel', 'Racing Wheel', 'wheel', 5),
    (6, 'big-screen-gaming', 'Big Screen Gaming', 'screen', 6);

INSERT INTO products (id, name, category_id, tag, per_day_rent, rating, booked_count, out_of_stock, icon, sort_order) VALUES
    (18273, 'PS5 + Games (100+) + 1 Controller', 2, 'Trending', 200, 4.6, 649, 0, 'console', 1),
    (20242, 'PS5 All in one Combo + 2 Controllers', 2, 'Trending', 440, 4.5, 604, 0, 'console', 2),
    (90001, 'Oculus Quest 3S', 4, 'Trending', NULL, 0, 0, 0, 'vr', 3),
    (18255, 'PS5 + Games (100+) + 2 Controllers', 2, 'Trending', 260, 4.8, 397, 0, 'console', 4),
    (90002, 'Oculus Quest 2', 4, 'Trending', NULL, 0, 0, 0, 'vr', 5),
    (20105, 'FC25 + 2 Controllers Combo', 2, 'Trending', 165, 4.8, 209, 0, 'console', 6),
    (8185, 'PS5 + 1 Controller (Disc or Digital) (No Games Included)', 2, '', 160, 4.8, 236, 0, 'console', 7),
    (90003, 'PS5 + GTA 6 with 1 Controller', 1, 'New', NULL, 0, 0, 0, 'console', 8),
    (90004, 'Xbox Series S (400+ Games) w/1 Controller-Model May Vary', 3, '', NULL, 0, 0, 0, 'pad', 9),
    (90005, 'Xbox Series S (200+ Games) w/2 Controllers-Model May Vary', 3, '', NULL, 0, 0, 0, 'pad', 10),
    (18117, 'PS5 + EA Play + 2 Controllers', 2, '', 260, 4.8, 167, 1, 'console', 11),
    (90006, 'Sony PlayStation PS VR2', 4, 'New', NULL, 0, 0, 0, 'vr', 12),
    (19716, 'PS5 All in one Combo + 1 Controller', 2, 'Trending', 260, 4.5, 187, 1, 'console', 13),
    (19680, 'PS5 + 2 Controllers (Disc or Digital) (No Games Included)', 2, '', 200, 4.2, 210, 0, 'console', 14),
    (17795, 'God Of War Ragnarök + 1 Controller (Digital Game)', 2, '', 200, 4.6, 164, 0, 'console', 15),
    (18055, 'PS5 + EA Play + 1 Controller', 2, '', 180, 4.5, 211, 0, 'console', 16),
    (20104, 'Uncharted Series + 1 Controller (Digital Game)', 2, '', 200, 4.6, 171, 0, 'console', 17),
    (20103, 'Cricket 24 + 2 Controllers (Digital Game)', 2, '', 200, 4.8, 186, 0, 'console', 18),
    (36028, 'PS5 + FC26 + 1 Controller', 2, 'New', 310, 4.8, 2527, 0, 'console', 19),
    (20102, 'Ghost of Tsushima + 1 Controller (Digital Game)', 2, '', 200, 4.6, 140, 0, 'console', 20),
    (20224, 'PS5 Mega Racing Wheel Combo', 2, '', 310, 4.8, 139, 1, 'wheel', 21),
    (36039, 'PS5 + FC26 + 2 Controllers', 2, 'New', 310, 4.8, 1524, 0, 'console', 22),
    (20098, 'FC24 + 2 Controllers (Digital Game)', 2, '', 200, 4.8, 165, 1, 'console', 23),
    (36050, 'PS5 + FC26 + 4 Controllers', 2, 'New', 310, 4.8, 1224, 0, 'console', 24),
    (20100, 'Spider-Man Miles Morales + 1 Controller (Digital Game)', 2, '', 200, 4.6, 123, 0, 'console', 25),
    (37512, 'PS5 + FC27 + 2 Controllers', 2, 'New', 300, 0, 652, 0, 'console', 26),
    (37501, 'PS5 + FC27 + 1 Controller', 2, 'New', 250, 0, 658, 0, 'console', 27),
    (37534, 'PS5 + FC27 + 4 Controllers', 2, 'New', 350, 0, 651, 0, 'console', 28),
    (37616, 'PlayStation Portal Remote Player', 2, 'Vote to Launch', 158.25, 0, 10000, 0, 'pad', 29);

INSERT INTO faqs (question, answer, sort_order) VALUES
    ('How can I rent from you?', 'Pick your delivery and pickup dates, add products to your cart, complete a quick one-time verification and check out. We deliver to your door and collect it when your rental ends.', 1),
    ('If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?', 'Partial extensions are possible. You can extend any single item from your order page as long as it is available for the extra days.', 2),
    ('When does the rental start?', 'Your rental period starts on the delivery date you choose. The delivery and pickup days are not charged.', 3),
    ('What will be the condition of the products at the time of delivery?', 'Every item is cleaned, tested and checked for all accessories before it is dispatched.', 4),
    ('Why is verification required?', 'Verification lets us offer zero-deposit rentals while keeping the gear safe. It only needs to be done once.', 5),
    ('Do I need to pay a security deposit?', 'No. Verified customers rent without any security deposit.', 6),
    ('What if something gets damaged during my rental?', 'Minor wear is expected. Accidental damage is handled under the damage policy, which you can read before booking.', 7);

-- Placeholder reviews.
INSERT INTO reviews (name, city, item, stars, body) VALUES
    ('Karan', 'Bangalore', 'Gaming Console', 5, 'Smooth from start to finish. Delivery was on time, the console was spotless and every cable was in the box.'),
    ('Meera', 'Pune', 'Camera', 5, 'Great way to try gear before buying it. Support answered every question quickly and pickup was on schedule.'),
    ('Arjun', 'Delhi', 'VR Headset', 4, 'Rented for a birthday party and it was the highlight of the evening. Booking took two minutes.'),
    ('Neha', 'Mumbai', 'Trekking Gear', 5, 'Everything arrived clean and well packed. Affordable compared to buying, and the return was hassle free.'),
    ('Rohit', 'Hyderabad', 'Racing Wheel', 5, 'Well maintained equipment and clear pricing with no surprises. Will definitely rent again next month.'),
    ('Ananya', 'Chennai', 'Projector', 4, 'Movie night sorted. The projector was easy to set up and the team even shared a quick how-to video.');
