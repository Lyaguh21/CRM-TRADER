import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

export const CustomSelect = ({
  label,
  placeholder,
  value,
  onChange,
  data,
  size = "lg",
  style = {},
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = data.find((item: any) => item.value === value);

  return (
    <div
      ref={selectRef}
      style={{
        position: "relative",
        marginBottom: "15px",
        ...style,
      }}
    >
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "500",
            fontSize: size === "lg" ? "16px" : "14px",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          border: "1px solid #ced4da",
          borderRadius: "4px",
          padding: size === "lg" ? "12px 15px" : "8px 12px",
          cursor: "pointer",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: size === "lg" ? "48px" : "40px",
          fontSize: size === "lg" ? "16px" : "14px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ color: value ? "#000" : "#6c757d" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <IconChevronDown
          size={20}
          style={{
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999, // Увеличиваем z-index
            maxHeight: "200px",
            overflowY: "auto",
            marginTop: "2px",
          }}
        >
          {data.map((item: any) => (
            <div
              key={item.value}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                backgroundColor: value === item.value ? "#e9ecef" : "#fff",
                borderBottom: "1px solid #f8f9fa",
                fontSize: size === "lg" ? "16px" : "14px",
                ":hover": {
                  backgroundColor: "#f8f9fa",
                },
              }}
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  value === item.value ? "#e9ecef" : "#fff";
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
