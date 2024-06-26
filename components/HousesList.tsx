import { NextPage, GetServerSideProps, GetServerSidePropsResult } from "next";
import HouseCard from "./Cards/HouseCard Responsive";
import { houses } from "@/constants/hot";
import LoadMore from "./LoadMore";

interface House {
  id: string;
  imageURL: string;
  price: number;
  name: string;
  capacity: number;
  sold: number;
  tagNames: Record<string, string>;
  tags: Record<string, boolean>;
  categories: string[];
}

interface Props {
  houses: House[];
  limit: number;
}

const isPropsResult = (
  result: GetServerSidePropsResult<Props>
): result is { props: Props } => {
  return (result as { props: Props }).props !== undefined;
};

const HousesList: NextPage<{ query: any }> = async (context: any) => {
  const result = (await getServerSideProps(
    context
  )) as GetServerSidePropsResult<Props>;

  if (!isPropsResult(result)) {
    return <div>Error loading houses</div>;
  }

  const {
    props: { houses: houses2, limit },
  } = result;

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-lg font-semibold text-center">زمین ها</h2>
      </div>
      {houses2?.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {houses2.map((house: House, index: number) => (
            <HouseCard key={index} {...house} />
          ))}
        </div>
      )}
      <LoadMore limit={limit} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const baseHouses = [...houses];

  const search = context.query?.search as string | undefined;
  const filter = context.query?.filter as string | undefined;
  const shows = context.query?.shows as string | undefined;

  const filteredByName = search
    ? baseHouses.filter(
        (house) =>
          typeof house.name === "string" &&
          house.name.toLowerCase().includes(search.toLowerCase())
      )
    : baseHouses;

  const categories = filter ? filter.split(",") : [];

  const finalFilteredHouses = filteredByName.filter(
    (house) =>
      !categories.length ||
      categories.some((category) => house.categories.includes(category.trim()))
  );
  const limited = finalFilteredHouses.length;
  const showsNumber = shows ? parseInt(shows, 10) : 8;
  const housesToShow = finalFilteredHouses.slice(0, showsNumber);

  return {
    props: {
      houses: housesToShow,
      limit: limited,
    },
  };
};

export default HousesList;
