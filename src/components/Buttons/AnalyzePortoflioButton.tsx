import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import type { PortfolioSnapshotDto } from "../../api/peticiones/wallet";


type AnalyzePortfolioButtonProps = {
  handleAnalyzePortfolio: () => void;
  handleGenerateReportFromDate: (from: Date) => void;
  onRequestSnapshots: () => void;
  snapshots: PortfolioSnapshotDto[];
  loadingSnapshots:boolean;

};

export default function AnalyzePortfolioButton({
  handleAnalyzePortfolio,
  handleGenerateReportFromDate,
  onRequestSnapshots,
  snapshots,
  loadingSnapshots
}: AnalyzePortfolioButtonProps ){

  const [openMain, setOpenMain] = useState(false);
  const [openSnapshots, setOpenSnapshots] = useState(false);

  const handleClickGenerate = async () => {
    setOpenMain(false);
    await onRequestSnapshots();
    setOpenSnapshots(true);
  };


  return (
    <div className="relative inline-block">
      
      {/* BOTÓN */}
      <button
        onClick={() => setOpenMain(v => !v)}
        className="bg-white px-3 py-2 text-xs text-primary font-semibold rounded-xl flex items-center gap-2"
      >
        <AutoAwesomeIcon style={{ color: "#1B98E0" }} />
        Analyze My Portfolio
      </button>

      {/* TOOLTIP */}
      {openMain && (
        <div className="absolute mt-2 right-0 bg-white shadow-sm  shadow-primary rounded-xl p-2 w-56 z-50">
          
          <button
            onClick={() => {
              setOpenMain(false);
              handleAnalyzePortfolio();
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray rounded-lg"
          >
            Ask AI about my portfolio
          </button>

          <button
            onClick={handleClickGenerate}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray rounded-lg"
          >
            Generate report with AI
          </button>

        </div>
      )}

      {/* TOOLTIP SNAPSHOTS */}
      {openSnapshots && (
        <div className="absolute mt-2 right-0 bg-white shadow-sm shadow-primary rounded-xl p-2 w-64 z-50">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500">
            Select report start date
          </div>

          {loadingSnapshots ? (
            <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>
          ) : (
            snapshots.map(snapshot => {
              const date = new Date(snapshot.snapshotDate); // convertir string a Date
              return (
                <button
                  key={snapshot.id} // usa id único
                  onClick={() => {
                    setOpenSnapshots(false);
                    handleGenerateReportFromDate(date);
                  }}
                 className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
                >
                  {date.toLocaleDateString()} - Now
                </button>
              );
            })
          )}

          
        </div>
      )}
    </div>
  );
}