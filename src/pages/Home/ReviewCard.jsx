const ReviewCard = ({ review }) => {
  const { text, name, role } = review;

  return (
    <div className="bg-base-100 shadow-lg rounded-2xl p-6 max-w-md mx-auto relative">
      {/* Quote Icon */}
      <div className="text-5xl text-primary opacity-30 absolute top-4 left-4">
        “
      </div>

      {/* Review Text */}
      <p className="text-base-content/80 text-sm leading-relaxed mt-6">
        {text}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed my-6"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>

        {/* Name + Role */}
        <div>
          <h4 className="font-semibold text-base-content">{name}</h4>
          <p className="text-sm text-base-content/60">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
