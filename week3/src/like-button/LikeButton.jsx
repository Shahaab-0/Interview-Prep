import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./button.css";

const LikeButton = () => {
  const [state, setState] = useState({
    isLoading: false,
    isLiked: false,
    isHovered: false,
    error: null,
  });

  // simulate API (50% success)
  const fakeApi = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve()
          : reject(new Error("Something went wrong"));
      }, 1000);
    });

  const handleClick = async () => {
    if (state.isLoading) return;

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      await fakeApi();

      // toggle like on success
      setState(prev => ({
        ...prev,
        isLoading: false,
        isLiked: !prev.isLiked
      }));
    } catch (err) {
      // failure → revert state
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message
      }));
    }
  };

  return (
    <div>
      <button
        className="btn"
        disabled={state.isLoading}
        onClick={handleClick}
        onMouseEnter={() =>
          setState(prev => ({ ...prev, isHovered: true }))
        }
        onMouseLeave={() =>
          setState(prev => ({ ...prev, isHovered: false }))
        }
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 20,
          padding: "8px 14px",
          border: `2px solid ${
            state.isLiked || state.isHovered ? "#f00" : "#888"
          }`,
          background: state.isLiked ? "#f00" : "white",
          cursor: state.isLoading ? "not-allowed" : "pointer",
        }}
      >
        {state.isLoading ? (
          <span className="spinner" />
        ) : (
          <FaHeart
            size={18}
            color={
              state.isLiked
                ? "white"
                : state.isHovered
                ? "#f00"
                : "#888"
            }
          />
        )}

        <span
          style={{
            color: state.isLiked ? "white" : "#333",
          }}
        >
          Like
        </span>
      </button>

      {/* ✅ error message */}
      {state.error && (
        <p style={{ color: "#f00", marginTop: 6 }}>
          {state.error}
        </p>
      )}
    </div>
  );
};

export default LikeButton;