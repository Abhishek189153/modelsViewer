import {
  FiLogOut,
} from "react-icons/fi";

import {
  Box,
  Sparkles,
} from "lucide-react";

const Navbar = ({ user, logout }) => {
  return (
    <nav
      className="
      sticky
      top-0
      z-50
      h-24
      px-8
      flex
      items-center
      justify-between
      border-b
      border-white/10
      bg-black/30
      backdrop-blur-2xl
    "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">

          <Box
            size={28}
            className="text-cyan-400"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            3D Viewer Studio
          </h1>

          <div className="flex items-center gap-2 mt-1">
            <Sparkles
              size={14}
              className="text-cyan-400"
            />

            <p className="text-sm text-slate-400">
              Interactive 3D Visualization
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <div className="hidden md:block text-right">

          <p className="font-semibold text-lg">
            {user?.name}
          </p>

          <p className="text-sm text-slate-400">
            Authenticated User
          </p>
        </div>

        <button
          onClick={logout}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            px-5
            py-3
            bg-red-500/10
            border
            border-red-500/20
            hover:bg-red-500/20
            transition-all
          "
        >
          <FiLogOut />

          <span className="hidden sm:block">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;