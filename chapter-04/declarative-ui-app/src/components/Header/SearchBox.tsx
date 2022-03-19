import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { RiSearchLine } from "react-icons/ri";

/**
 * Alternativas para lidar com campos de formulários
 * 
 * - Controlled components
 * - Uncontrolled components
 */

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input 
        ref={searchInputRef}
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
      />
        
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  )
}