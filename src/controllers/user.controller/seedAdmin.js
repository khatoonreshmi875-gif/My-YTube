import { User } from "../../models/user.model";
import asynchandler from "../../utils/asynchandler";

export const createAdmin = asynchandler(async (req, res) => {
  const existingAdmin = await User.findOne({
    email: "khatoonreshmi875@gmail.com",
  });

  if (existingAdmin) {
    console.log("Admin already exists:", existingAdmin.username);
    process.exit(0);
  }
  const adminUser = await User.create({
    fullName: "Reshmi Khatoon",
    email: process.env.ADMIN_EMAIL,
    username: "reshmi_admin",
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
    avatar: "download(1).jpg",
    // ✅ required
    description: "System administrator account", //
  });
  await adminUser.save();
  console.log("✅ Admin created successfully:", adminUser.username);
  process.exit(0);
});
createAdmin();
