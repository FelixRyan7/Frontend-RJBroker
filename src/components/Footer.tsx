

export default function Footer() {
  return (
    
    <footer className="w-full bg-dark text-secondary py-10 mt-10 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + Descripción */}
        <div>
          <h2 className="text-xl font-bold text-primary">RJBroker</h2>
          <p className="mt-3 text-sm opacity-80">
            Construyendo tu futuro financiero con inversión responsable,
            educación y herramientas diseñadas para crecer contigo.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-primary font-semibold mb-3">Plataforma</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-primary cursor-pointer">Productos</li>
            <li className="hover:text-primary cursor-pointer">Cartera</li>
            <li className="hover:text-primary cursor-pointer">Mercados</li>
            <li className="hover:text-primary cursor-pointer">Aprendizaje</li>
          </ul>
        </div>

        {/* Información Legal */}
        <div>
          <h3 className="text-primary font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-primary cursor-pointer">Términos y Condiciones</li>
            <li className="hover:text-primary cursor-pointer">Política de Privacidad</li>
            <li className="hover:text-primary cursor-pointer">Riesgos de Inversión</li>
            <li className="hover:text-primary cursor-pointer">Protección al Inversor</li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-primary font-semibold mb-3">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li className="opacity-80">support@rjbroker.com</li>
            <li className="opacity-80">+34 611 123 456</li>
            <li className="opacity-80">Madrid, España</li>
          </ul>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="border-t border-primary/20 mt-10 pt-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} RJBroker — Todos los derechos reservados.
      </div>
    </footer>
  )
}
