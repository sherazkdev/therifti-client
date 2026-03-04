import {
  Shirt,
  ShoppingBag,
  Laptop,
  Smartphone,
  Dumbbell,
  Trophy,
  Baby,
  Watch,
  Gamepad2,
  Sofa,
} from "lucide-react";

export const categories = [
  {
    id: "1",
    name: "Men",
    children: [
      {
        id: "11",
        name: "Clothing",
        icon: Shirt,
        children: [
          { id: "111", name: "Shirts" },
          { id: "112", name: "T-Shirts" },
          { id: "113", name: "Pants" },
          { id: "114", name: "Jeans" },
          { id: "115", name: "Jackets" },
          { id: "116", name: "Sweaters" },
          { id: "117", name: "Hoodies" },
          { id: "118", name: "Suits" },
          { id: "119", name: "Shorts" },
          { id: "1110", name: "Tracksuits" },
        ],
      },
      {
        id: "12",
        name: "Shoes",
        icon: ShoppingBag,
        children: [
          { id: "121", name: "Sneakers" },
          { id: "122", name: "Formal Shoes" },
          { id: "123", name: "Boots" },
          { id: "124", name: "Sandals" },
          { id: "125", name: "Slippers" },
        ],
      },
      {
        id: "13",
        name: "Accessories",
        icon: Watch,
        children: [
          { id: "131", name: "Watches" },
          { id: "132", name: "Belts" },
          { id: "133", name: "Wallets" },
          { id: "134", name: "Sunglasses" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Women",
    children: [
      {
        id: "21",
        name: "Clothing",
        icon: Shirt,
        children: [
          { id: "211", name: "Dresses" },
          { id: "212", name: "Tops" },
          { id: "213", name: "Jeans" },
          { id: "214", name: "Skirts" },
          { id: "215", name: "Jackets" },
          { id: "216", name: "Activewear" },
          { id: "217", name: "Cardigans" },
          { id: "218", name: "Blazers" },
        ],
      },
      {
        id: "22",
        name: "Shoes",
        icon: ShoppingBag,
        children: [
          { id: "221", name: "Heels" },
          { id: "222", name: "Flats" },
          { id: "223", name: "Boots" },
          { id: "224", name: "Sneakers" },
        ],
      },
      {
        id: "23",
        name: "Bags",
        icon: ShoppingBag,
        children: [
          { id: "231", name: "Handbags" },
          { id: "232", name: "Backpacks" },
          { id: "233", name: "Clutches" },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Electronics",
    children: [
      {
        id: "31",
        name: "Mobiles",
        icon: Smartphone,
        children: [
          { id: "311", name: "Android Phones" },
          { id: "312", name: "iPhones" },
          { id: "313", name: "Accessories" },
        ],
      },
      {
        id: "32",
        name: "Laptops",
        icon: Laptop,
        children: [
          { id: "321", name: "Gaming Laptops" },
          { id: "322", name: "Office Laptops" },
          { id: "323", name: "MacBooks" },
        ],
      },
      {
        id: "33",
        name: "Gaming",
        icon: Gamepad2,
        children: [
          { id: "331", name: "Consoles" },
          { id: "332", name: "Controllers" },
          { id: "333", name: "Games" },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Sports",
    children: [
      {
        id: "41",
        name: "Outdoor Sports",
        icon: Trophy,
        children: [
          { id: "411", name: "Cricket" },
          { id: "412", name: "Football" },
          { id: "413", name: "Hockey" },
        ],
      },
      {
        id: "42",
        name: "Fitness",
        icon: Dumbbell,
        children: [
          { id: "421", name: "Gym Equipment" },
          { id: "422", name: "Yoga Mats" },
          { id: "423", name: "Supplements" },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Kids",
    children: [
      {
        id: "51",
        name: "Boys Clothing",
        icon: Shirt,
        children: [
          { id: "511", name: "T-Shirts" },
          { id: "512", name: "Shorts" },
          { id: "513", name: "School Uniforms" },
        ],
      },
      {
        id: "52",
        name: "Girls Clothing",
        icon: Shirt,
        children: [
          { id: "521", name: "Frocks" },
          { id: "522", name: "Leggings" },
          { id: "523", name: "Sweaters" },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Home",
    children: [
      {
        id: "61",
        name: "Furniture",
        icon: Sofa,
        children: [
          { id: "611", name: "Sofas" },
          { id: "612", name: "Beds" },
          { id: "613", name: "Tables" },
        ],
      },
      {
        id: "62",
        name: "Kitchen",
        icon: ShoppingBag,
        children: [
          { id: "621", name: "Cookware" },
          { id: "622", name: "Utensils" },
          { id: "623", name: "Appliances" },
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Beauty",
    children: [
      {
        id: "71",
        name: "Skincare",
        icon: ShoppingBag,
        children: [
          { id: "711", name: "Moisturizers" },
          { id: "712", name: "Serums" },
          { id: "713", name: "Face Wash" },
        ],
      },
      {
        id: "72",
        name: "Makeup",
        icon: ShoppingBag,
        children: [
          { id: "721", name: "Lipsticks" },
          { id: "722", name: "Foundations" },
          { id: "723", name: "Mascaras" },
        ],
      },
    ],
  },
  {
    id: "8",
    name: "Automotive",
    children: [
      {
        id: "81",
        name: "Car Accessories",
        icon: ShoppingBag,
        children: [
          { id: "811", name: "Seat Covers" },
          { id: "812", name: "Car Electronics" },
          { id: "813", name: "Cleaning Kits" },
        ],
      },
      {
        id: "82",
        name: "Bike Accessories",
        icon: ShoppingBag,
        children: [
          { id: "821", name: "Helmets" },
          { id: "822", name: "Gloves" },
          { id: "823", name: "Bike Covers" },
        ],
      },
    ],
  },
];