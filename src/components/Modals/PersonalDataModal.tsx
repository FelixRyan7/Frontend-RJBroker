import { useNavigate } from "react-router-dom";
import BasicButton from "../Buttons/BasicButton";

export default function PersonalDataModal() {
    const navigate = useNavigate()

    const handleGoToForm = () => {
      navigate("/complete-profile"); // ruta de tu formulario
    };
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white2 rounded-xl shadow-lg max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">📝 Completa tu perfil</h2>
        <p className="mb-6 text-gray">
          Para garantizar una experiencia fiable en nuestra plataforma necesitamos que completes tus datos personales.
        </p>
        <BasicButton
          onClick={handleGoToForm}
          className="w-full"
          color="dark"
        >
          Ir al formulario
        </BasicButton>
      </div>
    </div>
  )
}
