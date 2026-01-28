// src/components/Layout.jsx
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../components/ui/navigation-menu"; 
import { Link } from "react-router-dom";

const Layout = ({ children, user }) => {
  return (
    <div>
      <NavigationMenu className="bg-white py-4 border-b">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/" className="text-gray-800 hover:text-blue-600 font-bold text-lg">
                Início
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/search-results" className="text-gray-800 hover:text-blue-600 font-bold text-lg">
                Serviços
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/login" className="text-gray-800 hover:text-blue-600 font-bold text-lg">
                Entrar
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {user?.isSubscriber && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/subscriber-dashboard" className="text-gray-800 hover:text-blue-600 font-bold text-lg">
                  Meu Painel
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
