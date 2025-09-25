import Button from '@/components/ui/Button/Button'
import Heading from '@/components/ui/Typography/Heading'
import Text from '@/components/ui/Typography/Text'
import Card from '@/components/ui/Card/Card'
import Container from '@/components/layout/Container/Container'
import Grid from '@/components/layout/Grid/Grid'
import Stack from '@/components/layout/Stack/Stack'
import Input from '@/components/ui/Input/Input'
import Textarea from '@/components/ui/Input/Textarea'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <Container size="lg">
        <Stack spacing="2xl">
          {/* Header */}
          <div className="text-center">
            <Heading as="h1" variant="gradient">Phase 2 Component Test</Heading>
            <Text size="lg" className="mt-4">Testing all UI components built in Phase 2</Text>
          </div>

          {/* Buttons Section */}
          <Card padding="lg">
            <Stack spacing="lg">
              <Heading as="h2">Button Components</Heading>
              <Grid cols={3} gap="md">
                <Stack spacing="sm">
                  <Text weight="medium">Primary Buttons</Text>
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </Stack>
                <Stack spacing="sm">
                  <Text weight="medium">Secondary Buttons</Text>
                  <Button variant="secondary" size="sm">Small</Button>
                  <Button variant="secondary" size="md">Medium</Button>
                  <Button variant="secondary" size="lg">Large</Button>
                </Stack>
                <Stack spacing="sm">
                  <Text weight="medium">Ghost Buttons</Text>
                  <Button variant="ghost" size="sm">Small</Button>
                  <Button variant="ghost" size="md">Medium</Button>
                  <Button variant="ghost" size="lg">Large</Button>
                </Stack>
              </Grid>
              <div>
                <Button variant="primary" isLoading>Loading Button</Button>
              </div>
            </Stack>
          </Card>

          {/* Typography Section */}
          <Card padding="lg">
            <Stack spacing="lg">
              <Heading as="h2">Typography Components</Heading>
              <div>
                <Heading as="h1">Heading 1 - Main Title</Heading>
                <Heading as="h2">Heading 2 - Section Title</Heading>
                <Heading as="h3">Heading 3 - Subsection</Heading>
                <Heading as="h4">Heading 4 - Smaller Title</Heading>
                <Heading as="h5">Heading 5 - Minor Title</Heading>
                <Heading as="h6">Heading 6 - Smallest Title</Heading>
              </div>
              <div>
                <Heading as="h3" variant="gradient">Gradient Heading</Heading>
                <Text size="xl">Extra Large Text</Text>
                <Text size="lg">Large Text</Text>
                <Text size="base">Base Text (Default)</Text>
                <Text size="sm">Small Text</Text>
                <Text size="xs">Extra Small Text</Text>
              </div>
              <div>
                <Text weight="normal">Normal Weight</Text>
                <Text weight="medium">Medium Weight</Text>
                <Text weight="semibold">Semibold Weight</Text>
                <Text weight="bold">Bold Weight</Text>
                <Text variant="gradient" weight="bold">Gradient Text</Text>
              </div>
            </Stack>
          </Card>

          {/* Cards Section */}
          <div>
            <Heading as="h2" className="mb-6">Card Components</Heading>
            <Grid cols={3} gap="lg">
              <Card variant="default" padding="lg">
                <Stack spacing="md">
                  <Heading as="h4">Default Card</Heading>
                  <Text>This is a default card with standard styling and no special effects.</Text>
                </Stack>
              </Card>
              <Card variant="interactive" padding="lg" hover>
                <Stack spacing="md">
                  <Heading as="h4">Interactive Card</Heading>
                  <Text>This card is interactive with hover effects. Try hovering over it!</Text>
                </Stack>
              </Card>
              <Card variant="glass" padding="lg">
                <Stack spacing="md">
                  <Heading as="h4">Glass Card</Heading>
                  <Text>This card has a glassmorphism effect with backdrop blur.</Text>
                </Stack>
              </Card>
            </Grid>
          </div>

          {/* Layout Section */}
          <Card padding="lg">
            <Stack spacing="lg">
              <Heading as="h2">Layout Components</Heading>
              <div>
                <Heading as="h4">Grid Layout (4 columns)</Heading>
                <Grid cols={4} gap="md" className="mt-4">
                  <Card padding="md"><Text>Grid Item 1</Text></Card>
                  <Card padding="md"><Text>Grid Item 2</Text></Card>
                  <Card padding="md"><Text>Grid Item 3</Text></Card>
                  <Card padding="md"><Text>Grid Item 4</Text></Card>
                </Grid>
              </div>
              <div>
                <Heading as="h4">Stack Layout (Horizontal)</Heading>
                <Stack direction="horizontal" spacing="md" className="mt-4">
                  <Card padding="sm"><Text>Stack 1</Text></Card>
                  <Card padding="sm"><Text>Stack 2</Text></Card>
                  <Card padding="sm"><Text>Stack 3</Text></Card>
                </Stack>
              </div>
            </Stack>
          </Card>

          {/* Forms Section */}
          <Card padding="lg">
            <Stack spacing="lg">
              <Heading as="h2">Form Components</Heading>
              <Grid cols={2} gap="lg">
                <Stack spacing="md">
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    helperText="We'll never share your email"
                  />
                  <Input
                    label="Error Example"
                    placeholder="This field has an error"
                    error="This field is required"
                  />
                </Stack>
                <Stack spacing="md">
                  <Textarea
                    label="Message"
                    placeholder="Enter your message here..."
                    helperText="Tell us about your project"
                  />
                  <Input
                    variant="filled"
                    label="Filled Variant"
                    placeholder="This has filled background"
                  />
                </Stack>
              </Grid>
            </Stack>
          </Card>

          {/* Container Demo */}
          <div>
            <Heading as="h2" className="mb-6">Container Sizes</Heading>
            <Stack spacing="md">
              <Container size="sm" className="bg-purple-900/20 p-4 rounded">
                <Text>Small Container (max-w-2xl)</Text>
              </Container>
              <Container size="md" className="bg-purple-900/20 p-4 rounded">
                <Text>Medium Container (max-w-4xl)</Text>
              </Container>
              <Container size="lg" className="bg-purple-900/20 p-4 rounded">
                <Text>Large Container (max-w-6xl) - Current page container</Text>
              </Container>
            </Stack>
          </div>
        </Stack>
      </Container>
    </div>
  )
}