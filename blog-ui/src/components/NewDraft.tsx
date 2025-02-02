

const NewDraft = () => {
  return (
    <section className="sticky top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <div className="text-sm flex justify-center gap-8 py-8">
        <h1 className="text-2xl font-bold text-black px-8">Novo Post</h1>
        </div>
        <button className="bg-rose-400 cursor-pointer hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center">* Rascunho</button>
      </div>
    </section>
  )
}

export default NewDraft
