import { Icon, Link as ChackraLink, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType, ReactNode } from 'react'
import Link from 'next/link'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChackraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChackraLink>
    </Link>
  )
}