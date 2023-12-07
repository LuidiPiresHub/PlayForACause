import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const { status, data } = error.response;
    console.log(data);
    const errorMessage = (data as { message: string }).message
    if (status >= 400 && status < 500) {
      // Tratamento para erro de autenticação
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    } else {
      // Outros tratamentos de erro
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro interno no servidor!',
      })
    }
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta do servidor
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Sem resposta do servidor!',
    });
  } else {
    // Erro durante a configuração da requisição
    console.error('Erro ao configurar a requisição:', error.message);
  }
};
