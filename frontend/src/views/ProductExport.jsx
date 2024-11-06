import { useLoaderData } from 'react-router-dom';

const ProductExport = () => {
  const data = useLoaderData();
  console.log('ProductExport chamado com dados:', data);

  const handleDownload = () => {
    console.log('Botão de download clicado');
    const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'produtos.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={handleDownload}>Baixar arquivo Excel</button>
    </div>
  );
};

export default ProductExport;