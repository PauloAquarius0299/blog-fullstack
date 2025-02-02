
const Home = () => {
  

  return (
    <section className='p-4 px-2'>
      <div className='flex h-screen items-center justify-center p-5 bg-purple-100'>
        <div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
          <div className='w-full space-y-10 overflow-y-auto p-10 bg-white'>
            <h1 className='text-black font-bold text-4xl'>Tml dos Blogs</h1>

            <div className='flex gap-4'>
              <button className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'>
                Jogos
              </button>
              <button
                className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'
              >
                Viagens
              </button>
              <button
                className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'
              >
                Tecnologia
              </button>
              <button
                className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'
              >
                Economia
              </button>
              <button
                className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'
              >
                Esportes
              </button>
              <button
                className='px-6 py-2 cursor-pointer bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600'
              >
                Entretenimento
              </button>
            </div>

            <div className='my-4 border-t border-gray-300'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;