export interface Game {
  id: string;
  title: string;
  age: string;
  description: string; 
  image: string;
  videoUrl: string; 
}

export const gamesData: Game[] = [
  {
    id: "warstation",
    title: "WARSTATION",
    age: "6+",
    description: "Интенсивные перестрелки, тактическое планирование, красочные пейзажи и уникальное оружие.",
    image: "/warstation.jpg", 
    videoUrl: "https://vk.com/video_ext.php?oid=-206763745&id=456239158&autoplay=1" 
  },
  {
    id: "animestation",
    title: "ANIMESTATION",
    age: "6+",
    description: "Для любителей аниме-стилистики и динамичных action-игр в виртуальной реальности.",
    image: "/animestation.jpg",
    videoUrl: "https://vk.com/video_ext.php?oid=-206763745&id=456239208&autoplay=1"
  },
  {
    id: "military-station",
    title: "MILITARY STATION",
    age: "6+",
    description: "Для фанатов шутеров, мощного оружия и командной стратегии в суровых условиях.",
    image: "/military.jpg",
    videoUrl: "https://vk.com/video_ext.php?oid=-206763745&id=456239241&autoplay=1"
  },
  {
    id: "family-station",
    title: "FAMILY STATION",
    age: "6+",
    description: "Сборник мини-игр для самых захватывающих семейных сражений и веселого отдыха.",
    image: "/family.jpg",
    videoUrl: "https://vk.com/video_ext.php?oid=-206763745&id=456239267&autoplay=1"
  },
  {
    id: "kids-station",
    title: "KIDS STATION",
    age: "6+",
    description: "Фантазийные миры для самых маленьких героев и их безграничного воображения.",
    image: "/kids.jpg",
    videoUrl: "https://vk.com/video_ext.php?oid=-206763745&id=456239254&autoplay=1"
  }
];
