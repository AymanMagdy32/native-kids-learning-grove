import { BookOpen, MonitorPlay, PenLine, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MaterialSample = {
  id: string;
  title: string;
  desc: string;
  href: string;
  embed?: string;
  previewImage?: string;
  icon: LucideIcon;
  cta: string;
};

export const REAL_SAMPLES: MaterialSample[] = [
  {
    id: "worksheet",
    title: "ورقة عمل (Worksheet)",
    desc: "شوفي شكل التدريب اللي بيكمّل الحصة. ورقة العمل بتدي الطفل فرصة يطبّق اللي اتعلّمه، والمعلم يراجع فهمه.",
    href: "https://drive.google.com/file/d/1_jjQGr233k6PCuFa2UxxqFil5kTH37ai/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1_jjQGr233k6PCuFa2UxxqFil5kTH37ai/preview",
    icon: PenLine,
    cta: "افتح ورقة العمل",
  },
  {
    id: "debating",
    title: "مهارات المناظرة (Debating Skills)",
    desc: "ورقة عمل “Should Cars Be Banned?” لتدريب الطالب على بناء الحجج المؤيدة والمعارضة، وكتابة حجة مضادة، والتعبير عن رأيه بوضوح.",
    href: "/sample-files/worksheet-should-cars-be-banned-abridge-academy.pdf",
    previewImage: "/sample-files/worksheet-should-cars-be-banned-preview.png",
    icon: PenLine,
    cta: "افتح ورقة المناظرة",
  },
  {
    id: "flashcards",
    title: "بطاقات تعليمية (Flashcards)",
    desc: "شوفي إزاي بنربط الكلمة بصورة، ونستخدم البطاقات في أسئلة وألعاب تساعد الطفل يفتكر المفردات ويستخدمها.",
    href: "https://drive.google.com/file/d/1K4TBdSjI2kgB6elZIw2AeGrp6EilhD8Y/view",
    embed: "https://drive.google.com/file/d/1K4TBdSjI2kgB6elZIw2AeGrp6EilhD8Y/preview",
    icon: Sparkles,
    cta: "افتح البطاقات",
  },
  {
    id: "lesson-preview",
    title: "شرائح تفاعلية (Slides)",
    desc: "ده نموذج للمادة اللي المعلم بيستخدمها عشان يسأل الطفل ويشجّعه يشارك. العرض جزء من حصة مباشرة، مش فيديو الطفل بيتفرّج عليه لوحده.",
    href: "https://view.genially.com/6234ea9e38e8190012c4066b",
    embed: "https://view.genially.com/6234ea9e38e8190012c4066b",
    icon: MonitorPlay,
    cta: "افتح العرض التفاعلي",
  },
  {
    id: "home-guide",
    title: "دليل البيت لولي الأمر",
    desc: "شوفي إزاي تعرفي طفلك اتعلّم إيه بعد كل وحدة، وتجرّبي معاه نشاط بسيط بالعربي والإنجليزي. الدليل بيساعدك تكمّلي معاه في البيت حتى لو إنجليزيتك مش قوية.",
    href: "https://drive.google.com/file/d/1YAh39uUf-JvkMNSLkpWX0sZg7-6zNiTi/view?usp=sharing",
    embed: "https://drive.google.com/file/d/1YAh39uUf-JvkMNSLkpWX0sZg7-6zNiTi/preview",
    icon: BookOpen,
    cta: "افتحي الدليل في صفحة جديدة",
  },
];
