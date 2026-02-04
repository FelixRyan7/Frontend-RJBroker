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
            className="cursor-pointer flex items-center gap-4 p-2"
            onClick={onToggle}
        >
            <h2 className="font-semibold">{type}S</h2>
            <BasicButton
                className="w-8 h-8 flex items-center justify-center"
                onClick={() => navigate(`/assets/${type}`)}
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