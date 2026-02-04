
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SerachInputProps{
  Position?: string;
  showCloseButton?: boolean
  onClose?: () => void
}

// componente para hacer busqueda de assets en diferentes secciones de la app
export default function SearchInput({Position = "", showCloseButton = false,  onClose}: SerachInputProps) {
  return (
   
    <>
    <div className={`fixed ${Position} left-1/2 transform -translate-x-1/2 w-full max-w-sm px-4 z-20`}>
      <div className="relative flex justify-between w-full pl-10 pr-4 py-2 bg-white/40 backdrop-blur-md rounded-full text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition h-20 shadow-sm shadow-gray">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
          <SearchIcon className="h-5 w-5" />
        </span>
        <input
          type="text"
          placeholder="Search By Name or Symbol..."
          className="bg-transparent w-full placeholder-gray focus:outline-none focus:border-transparent"
        />
        
        {showCloseButton && (
          <div className="flex items-center ml-2 h-full">
            {/* Línea vertical */}
            <span className="w-[2px] rounded-full h-3/5 bg-gray mx-2 mr-3" />

            {/* Botón de cerrar */}
            <button
              type="button"
              onClick={() => {
                onClose?.(); 
              }}
              className="text-gray h-full flex items-center justify-center mr-2"
            >
              <span className='text-gray'>
              <CloseIcon  sx={{  fontSize: 32}}/>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
