import useEcommerceContext from "../context/useEcommerceContext";

const Alert = () => {
  const { alertInfo } = useEcommerceContext();
  if (!alertInfo.visible) return null;

  return (
    <div
      className="position-fixed top-0 start-50 translate-middle-x mt-2 px-2"
      style={{ zIndex: 9999, width: "auto", maxWidth: "95vw" }}
    >
      <div
        className={`alert alert-${alertInfo.type} alert-dismissible fade show shadow mb-0 py-2 px-3`}
        role="alert"
        style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}
      >
        {alertInfo.message}
      </div>
    </div>
  );
};

export default Alert;
