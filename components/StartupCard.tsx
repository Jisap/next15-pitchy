import { formatDate } from "@/lib/utils";

export interface StartupTypeCard {
  _creartedAt: string;
  views: number;
  author: {_id: number};
  _id: number;
  description: string;
  image: string;
  category: string;
  title: string;
}

const StartupCard = ( { post }: { post: StartupTypeCard } ) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">
          {formatDate(post?._creartedAt)}
        </p>
      </div>
    </li>
  )
}

export default StartupCard