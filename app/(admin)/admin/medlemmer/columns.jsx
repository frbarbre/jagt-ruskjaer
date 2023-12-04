'use client';

import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const columns = [
  {
    accessorKey: 'avatar',
    header: 'Avatar',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Avatar
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer self-center justify-self-end z-20 relative md:w-11 md:h-11"
        >
          <AvatarImage src={user.avatar} />
          <AvatarFallback>
            {user.fornavn?.[0]}
            {user.efternavn?.[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'fornavn',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-translate-x-[17px]"
        >
          Fornavn
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'efternavn',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-translate-x-[17px]"
        >
          Efternavn
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-translate-x-[17px]"
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'telefon',
    header: 'Telefon',
  },
  {
    accessorKey: 'admin',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-translate-x-[17px]"
        >
          Admin
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'valg',
    cell: ({ row }) => {
      const user = row.original;

      const router = useRouter();
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );

      async function deleteUser() {
        const { data, error } = await supabase.auth.admin.deleteUser(user.id);
        if (error) {
          console.log(error);
        } else {
          router.refresh();
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Valg</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={deleteUser}>
              Slet bruger
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];