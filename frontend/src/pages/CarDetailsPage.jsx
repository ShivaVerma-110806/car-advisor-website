import { useParams } from "react-router-dom";
import CarDetailsContent from "../components/car/CarDetailsContent";

export default function CarDetailsPage() {
  const { id } = useParams();
  return <CarDetailsContent carId={id} />;
}
