export default function SizeGuide() {
  const sizes = [
    { size: 'XS', chest: '86-91', waist: '71-76', hip: '86-91' },
    { size: 'S', chest: '91-96', waist: '76-81', hip: '91-96' },
    { size: 'M', chest: '96-101', waist: '81-86', hip: '96-101' },
    { size: 'L', chest: '101-106', waist: '86-91', hip: '101-106' },
    { size: 'XL', chest: '106-112', waist: '91-97', hip: '106-112' },
  ];

  return (
    <section id="tallas" className="section-padding bg-[#231123]">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4 text-white">Guía de Tallas</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Encuentra tu talla perfecta. Todas las medidas están en centímetros.
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-x-auto">
          <table className="w-full rounded-2xl bg-[#1a0f1a] border border-white/10 shadow-lg shadow-primary-500/10">
            <thead>
              <tr className="border-b border-white/10 bg-[#0f0a0f]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Talla
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Pecho (cm)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Cintura (cm)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Cadera (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, index) => (
                <tr
                  key={row.size}
                  className={`transition-colors hover:bg-white/5 ${
                    index !== sizes.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-bold text-primary-500">
                    {row.size}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {row.chest}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {row.waist}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {row.hip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 rounded-xl bg-primary-500/10 border border-primary-500/20 p-6">
            <h3 className="mb-3 font-semibold text-white flex items-center gap-2">
              <span className="text-xl">💡</span>
              Consejos para medir
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Mide sobre ropa interior ajustada</li>
              <li>• Mantén la cinta métrica paralela al suelo</li>
              <li>• No aprietes la cinta, debe estar cómoda</li>
              <li>• Si estás entre dos tallas, elige la mayor para oversized</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

