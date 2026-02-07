import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  color: "primary" | "secondary" | "accent";
}

const CategoryCard = ({ icon: Icon, title, description, href, color }: CategoryCardProps) => {
  const colorClasses = {
    primary: "from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/20",
    secondary: "from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 border-secondary/20",
    accent: "from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 border-accent/20",
  };

  const iconColorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
  };

  const buttonColorClasses = {
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    accent: "bg-accent/10 text-accent hover:bg-accent/20",
  };

  return (
    <Card className={`h-full bg-gradient-to-br ${colorClasses[color]} border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer overflow-hidden`}>
      <Link to={href} className="block h-full">
        <CardContent className="p-3 flex flex-col items-center text-center space-y-3">
          <div className={`p-2 rounded-xl ${iconColorClasses[color]} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <button className={`mt-1 px-4 py-2 rounded-md text-sm font-normal transition-colors whitespace-nowrap ${buttonColorClasses[color]}`}>
            詳細を見る
          </button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CategoryCard;