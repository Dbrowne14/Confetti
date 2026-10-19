export const AddCircleButton = ({openNewCircle
}:{openNewCircle: ()=> void}) => {
  return (
    <div>
      <button
        className="h-full aspect-square border-confetti-border bg-confetti-surface rounded-2xl"
        onClick={()=> {openNewCircle()
          console.log("openingCircle")
        } }
      >
        <div className="flex flex-col">
          <span>+</span>
          <span>New Circle</span>
        </div>
      </button>
    </div>
  );
};
