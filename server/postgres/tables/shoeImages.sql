BEGIN TRANSACTION;

Create table public.shoe_images (
    "id" serial not NULL,
    "name" VARCHAR(100) not null UNIQUE REFERENCES shoes("name"),
    image1 text not null,
    image2 text not null,
    image3 text not null
    
);

INSERT INTO public.shoe_images (id, name, image1, image2, image3) VALUES
	(3, 'Nike Air Max 270', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690994691/air-max-270-mens-shoes-KkLcGR_iaa8dw.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690995172/image2_twgpy6.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690995508/image3_jvhfri.webp'),
	(4, 'Nike Air VaporMax 2023 Flyknit', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690996392/air-vapormax-2023-flyknit-mens-shoes-3q1qZg_qbukk4.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690996517/air-vapormax-2023-flyknit-mens-shoes-3q1qZg_mbwwdh.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690996595/air-vapormax-2023-flyknit-mens-shoes-3q1qZg_yiuzee.jpg'),
	(6, 'Ja 1 "Fuel"', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690997003/ja-1-fuel-basketball-shoes-ftCb5g_w99mja.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690997054/ja-1-fuel-basketball-shoes-ftCb5g_nzsxd1.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690997115/ja-1-fuel-basketball-shoes-ftCb5g_nge2xt.jpg'),
	(7, 'LeBron Soldier 14', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690998558/lebron-soldier-14-basketball-shoes-qkSRCH_l0aqzz.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690998603/lebron-soldier-14-basketball-shoes-qkSRCH_pkpy1t.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1690998697/lebron-soldier-14-basketball-shoes-qkSRCH_pdzthv.jpg'),
	(8, 'Nike On Deck', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691726732/on-deck-mens-slides-McrHWg_ayznxn.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691726881/on-deck-mens-slides-McrHWg_exjckv.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691726802/on-deck-mens-slides-McrHWg_f4ubtw.jpg'),
	(9, 'Nike Victori One', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691802617/victori-one-mens-shower-slides-ZD82Jn_x5f2v1.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691802658/victori-one-mens-shower-slides-ZD82Jn_fim9af.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691802696/victori-one-mens-shower-slides-ZD82Jn_gccz3f.jpg'),
	(10, 'Nike Cortez', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691802936/cortez-mens-shoes-SxhPXX_bkpqyz.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691803017/cortez-mens-shoes-SxhPXX_majtgk.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691802978/cortez-mens-shoes-SxhPXX_qayedu.jpg'),
	(11, 'Nike Dunk Low Premium MF', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691803511/dunk-low-premium-mf-womens-shoes-QwvHrM_mnozpk.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691803709/dunk-low-premium-mf-womens-shoes-QwvHrM_flszac.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691803546/dunk-low-premium-mf-womens-shoes-QwvHrM_hybpk9.jpg'),
	(12, 'Nike Calm', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814323/calm-womens-slides-7XtJSh_y6lkil.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814397/calm-womens-slides-7XtJSh_cdepjf.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814358/calm-womens-slides-7XtJSh_qzurak.jpg'),
	(13, 'Nike Victori One x Nike United', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814824/victori-one-x-nike-united-womens-slides-dLThzx_bx9feu.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814767/victori-one-x-nike-united-womens-slides-dLThzx_poo3xl.jpg', 'https://res.cloudinary.com/ds4wntnyf/image/upload//c_thumb,w_592,h_592/v1691814870/victori-one-x-nike-united-womens-slides-dLThzx_opliiz.jpg');

COMMIT;