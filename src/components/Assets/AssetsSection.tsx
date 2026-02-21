import { useNavigate } from "react-router-dom";
import type { AssetSectionProps } from "../../@types/assets";
import BasicButton from "../Buttons/BasicButton";
import { AssetsRow } from "./AssetsRow";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Componente que renderiza una sección de assets por tipo
export function AssetsSection({ type, assets, onToggle }: AssetSectionProps) {
    const navigate = useNavigate()
  return (
    <section className="mb-6">
        <div
            className="cursor-pointer flex items-center md:gap-4 gap-2 p-2 ml-[7px]"
            onClick={onToggle}
        >
            <h2 className="font-semibold leading-none">{type}</h2>
            <BasicButton
                className="w-4 h-4 p-[9px] flex justify-center"
                onClick={() => navigate(`/assets/type/${type}`)}
            >
                <NavigateNextIcon/>
            </BasicButton>
        </div>
        <div
        >
            <AssetsRow assets={assets} />
        </div>
    </section>
  );
}