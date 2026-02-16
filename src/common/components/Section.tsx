// Basic usage with new features
<Section
  title="Asset Details"
  subtitle="View and manage asset information"
  icon={<FileText size={20} />}
  badge={<Badge colorScheme="green">Active</Badge>}
  variant="primary"
  actions={[
    <Button key="edit" size="sm">Edit</Button>,
    <IconButton key="refresh" aria-label="Refresh" icon={<RefreshIcon />} size="sm" />
  ]}
  topRight={<Button colorScheme="blue">Create New</Button>}
  collapsible
  defaultCollapsed={false}
  onToggle={(collapsed) => console.log('Section collapsed:', collapsed)}
>
  <YourContent />
</Section>

// With loading state
<Section
  title="Loading Section"
  loading={true}
  loadingSkeleton={<CustomSkeleton />}
>
  <YourContent />
</Section>

// With empty state
<Section
  title="Empty Section"
  isEmpty={true}
  empty={<EmptyState message="No items found" />}
>
  <YourContent />
</Section>

// With sticky header and scrollable content
<Section
  title="Long List"
  stickyHeader
  headerStickyTop="60px"
  scrollable
  maxHeight="400px"
>
  <LongList />
</Section>

// With footer
<Section
  title="Form Section"
  footer={
    <Flex justify="flex-end" gap={2}>
      <Button variant="ghost">Cancel</Button>
      <Button colorScheme="blue">Save</Button>
    </Flex>
  }
>
  <FormContent />
</Section>
