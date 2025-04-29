import { Button } from "@/components/ui/button";
import { DribbbleIcon, TwitchIcon, TwitterIcon } from "lucide-react";
import {Link} from "react-router-dom";
import TeamImage from '../../assets/1234.jpg'
const teamMembers = [
  {
    name: "Arqam Habib Ghauri",
    title: "Founder & CEO",
    bio: "Former co-founder of Opendoor. Early staff at Spotify and Clearbit.",
    imageUrl:TeamImage
  },
  {
    name: "Taha Siddiqui",
    title: "Engineering Manager",
    bio: "Lead engineering teams at Figma, Pitch, and Protocol Labs.",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQEWMhbe7zmnQg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719434705972?e=1745452800&v=beta&t=qB4ExPNSgQAzMjCENVcgUV-dB1T7dPtzSPT7SELUc9c",
  },
  {
    name: "Haroon Mirza",
    title: "Product Manager",
    bio: "Former PM for Linear, Lambda School, and On Deck.",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D35AQEi622JfiyZtQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1719444362388?e=1740427200&v=beta&t=oYRJHFyt0F1yQpPvVMrwpJo-Lip45DVWzlW3UfY-tiI",
  },
 
];

const TeamSection = () => {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-12 px-6 lg:px-8 max-w-screen-xl mx-auto gap-16">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          Meet Our Team
        </h2>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 ">
        {teamMembers.map((member) => (
          <div key={member.name}>
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full aspect-square rounded-lg object-cover bg-secondary"
              width={600}
              height={600}
            />
            <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
            <p className="text-secondary">{member.title}</p>
            <p className="mt-3 text-muted-foreground">{member.bio}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <Button
                className="bg-muted hover:bg-muted text-muted-foreground shadow-none"
                size="icon"
                asChild
              >
                <Link href="#" target="_blank">
                  <TwitterIcon className="stroke-muted-foreground" />
                </Link>
              </Button>
              <Button
                className="bg-muted hover:bg-muted text-muted-foreground shadow-none"
                size="icon"
                asChild
              >
                <Link href="#" target="_blank">
                  <DribbbleIcon className="stroke-muted-foreground" />
                </Link>
              </Button>
              <Button
                className="bg-muted hover:bg-muted text-muted-foreground shadow-none"
                size="icon"
                asChild
              >
                <Link href="#" target="_blank">
                  <TwitchIcon className="stroke-muted-foreground" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
