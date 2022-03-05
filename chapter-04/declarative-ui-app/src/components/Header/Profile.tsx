import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Gabriel Gigante</Text>
        <Text color="gray.300" fontSize="small">
          gabrielgigante29@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Gabriel Gigante" src="https://github.com/gagigante.png" />
    </Flex>
  )
}