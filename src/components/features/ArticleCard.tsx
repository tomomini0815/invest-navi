import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  thumbnail?: string;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  category,
  date,
  thumbnail,
}: ArticleCardProps) => {
  return (
    <Link to={`/guide/${id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        {thumbnail && (
          <div className="h-48 overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{category}</Badge>
          </div>
          <h3 className="font-bold text-lg leading-tight line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;