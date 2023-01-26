interface AuthInputProps {
  label: string;
  value: any;
  type?: "text" | "email" | "password";
  required?: boolean;
  shouldNotRender?: boolean;
  changeValue: (newValue: any) => void;
}

export default function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4">
      <label>{props.label}</label>
      <input
        className="px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-400 focus:outline-none focus:bg-white"
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.changeValue?.(e.target.value)}
        required={props.required}
      />
    </div>
  );
}
