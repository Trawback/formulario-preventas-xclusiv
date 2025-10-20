export default function SizeGuide() {
  const sizes = [
    { size: 'XS', chest: '86-91', waist: '71-76', hip: '86-91' },
    { size: 'S', chest: '91-96', waist: '76-81', hip: '91-96' },
    { size: 'M', chest: '96-101', waist: '81-86', hip: '96-101' },
    { size: 'L', chest: '101-106', waist: '86-91', hip: '101-106' },
    { size: 'XL', chest: '106-112', waist: '91-97', hip: '106-112' },
    { size: 'XXL', chest: '112-118', waist: '97-103', hip: '112-118' },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4">Guía de Tallas</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Encuentra tu talla perfecta. Todas las medidas están en centímetros.
          </p>
        </div>

        <div className="mx-auto max-w-4xl overflow-x-auto">
          <table className="w-full rounded-2xl bg-white shadow-lg">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Talla
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Pecho (cm)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Cintura (cm)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Cadera (cm)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, index) => (
                <tr
                  key={row.size}
                  className={
                    index !== sizes.length - 1 ? 'border-b border-gray-100' : ''
                  }
                >
                  <td className="px-6 py-4 text-sm font-bold text-primary-600">
                    {row.size}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.chest}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.waist}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.hip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 rounded-xl bg-primary-50 p-6">
            <h3 className="mb-3 font-semibold text-primary-900">
              💡 Consejos para medir
            </h3>
            <ul className="space-y-2 text-sm text-primary-800">
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

