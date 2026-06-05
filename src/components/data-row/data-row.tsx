import { formatarPreco } from "@/utils/formatacao";

type Dados = {
  dataAlteracao: string;
  nomeAnterior: string;
  precoAnterior: number;
}

const DataRow = ({dataAlteracao, nomeAnterior, precoAnterior} : Dados) => {
  return (
    //t = table   r = row  d = data
    <tr>
      <td>{dataAlteracao}</td>
      <td>{nomeAnterior}</td>
      <td>{formatarPreco(precoAnterior)}</td>
    </tr>
  )
}

export default DataRow;