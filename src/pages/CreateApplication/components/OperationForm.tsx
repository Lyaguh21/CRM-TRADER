import { useState } from "react";
import {
  Container,
  Title,
  Stepper,
  Group,
  Button,
  Select,
  TextInput,
  NumberInput,
  Textarea,
  Card,
  Text,
  Divider,
  Grid,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconClipboard,
  IconCopyCheck,
  IconMoneybag,
} from "@tabler/icons-react";

const CreateExchangeRequest = () => {
  const [active, setActive] = useState(0);
  const [exchangeType, setExchangeType] = useState("cryptoToCash");
  const [autoCommission, setAutoCommission] = useState(true);
  const [adminMode, setAdminMode] = useState(false);

  const form = useForm({
    initialValues: {
      currencyFrom: "",
      currencyTo: "",
      amount: 0,
      commission: 3.2,
      rate: 10.3,
      total: 0,
      location: "",
      locationType: "point",
      comment: "",
      contact: "",
      contactType: "telegram",
    },
  });

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // Функция для расчета итоговой суммы
  const calculateTotal = () => {
    const { amount, commission, rate } = form.values;
    const calculatedTotal = amount * rate * (1 - commission / 100);
    form.setFieldValue("total", parseFloat(calculatedTotal.toFixed(2)));
  };

  // Обработчик изменения суммы
  const handleAmountChange = (value) => {
    form.setFieldValue("amount", value);
    if (autoCommission) {
      form.setFieldValue("commission", value > 1000 ? 3.2 : 2.5);
    }
    calculateTotal();
  };

  // Обработчик изменения комиссии
  const handleCommissionChange = (value) => {
    form.setFieldValue("commission", value);
    calculateTotal();
  };

  // Обработчик изменения курса
  const handleRateChange = (value) => {
    form.setFieldValue("rate", value);
    calculateTotal();
  };

  // Обработчик изменения типа обмена
  const handleExchangeTypeChange = (value) => {
    setExchangeType(value);
    form.setFieldValue("currencyFrom", "");
    form.setFieldValue("currencyTo", "");
  };

  // Данные для выбора валют
  const cashCurrencies = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "RUB", label: "RUB" },
  ];

  const cryptoCurrencies = [
    { value: "USDT_TRC20", label: "USDT (TRC20)" },
    { value: "USDT_ERC20", label: "USDT (ERC20)" },
    { value: "BTC", label: "BTC - Bitcoin" },
    { value: "ETH", label: "ETH - Ethereum" },
  ];

  // Точки сделок
  const locations = [
    { value: "office_1", label: "Центральный офис" },
    { value: "office_2", label: "Филиал на Ленина" },
    { value: "office_3", label: 'Торговый центр "Центральный"' },
  ];

  return (
    <Container size="md" style={{ padding: "20px 0" }}>
      <Stepper
        active={active}
        orientation="vertical"
        onStepClick={setActive}
        px={15}
      >
        <Stepper.Step
          icon={<IconClipboard />}
          label="Тип операции"
          description="Выбор направления обмена"
        >
          <Card withBorder>
            <Grid>
              <Select
                label="Тип обмена"
                placeholder="Выберите тип операции"
                size="lg"
                w="100%"
                value={exchangeType}
                onChange={handleExchangeTypeChange}
                data={[
                  { value: "cryptoToCash", label: "Крипта → Нал" },
                  { value: "cashToCrypto", label: "Нал → Крипта" },
                ]}
                style={{ marginBottom: "20px" }}
              />
              <Select
                mb={15}
                size="lg"
                w="100%"
                label={
                  exchangeType === "cryptoToCash" ? "Отдаете" : "Получаете"
                }
                placeholder="Выберите валюту"
                value={
                  exchangeType === "cryptoToCash"
                    ? form.values.currencyFrom
                    : form.values.currencyTo
                }
                onChange={(value) =>
                  exchangeType === "cryptoToCash"
                    ? form.setFieldValue("currencyFrom", value)
                    : form.setFieldValue("currencyTo", value)
                }
                data={
                  exchangeType === "cryptoToCash"
                    ? cryptoCurrencies
                    : cashCurrencies
                }
              />

              <Select
                size="lg"
                w="100%"
                label={
                  exchangeType === "cryptoToCash" ? "Получаете" : "Отдаете"
                }
                placeholder="Выберите валюту"
                value={
                  exchangeType === "cryptoToCash"
                    ? form.values.currencyTo
                    : form.values.currencyFrom
                }
                onChange={(value) =>
                  exchangeType === "cryptoToCash"
                    ? form.setFieldValue("currencyTo", value)
                    : form.setFieldValue("currencyFrom", value)
                }
                data={
                  exchangeType === "cryptoToCash"
                    ? cashCurrencies
                    : cryptoCurrencies
                }
              />
            </Grid>
          </Card>
        </Stepper.Step>

        <Stepper.Step
          icon={<IconMoneybag />}
          label="Сумма и курс"
          description="Расчет операции"
        >
          <Card withBorder>
            <Grid>
              <NumberInput
                label="Сумма обмена"
                value={form.values.amount}
                onChange={handleAmountChange}
                min={0}
                w="100%"
                size="lg"
                hideControls
                step={1}
                style={{ marginBottom: "15px" }}
              />
            </Grid>

            <Grid mt={10}>
              <NumberInput
                label="Курс обмена"
                value={form.values.rate}
                onChange={handleRateChange}
                w="100%"
                min={0}
                size="lg"
                hideControls
              />
            </Grid>

            <Divider style={{ margin: "15px 0" }} />

            <Box
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
              }}
            >
              <Text size="lg" fw={500}>
                Итоговая сумма: {form.values.total.toFixed(2)}
              </Text>
              <Text size="sm" color="dimmed">
                {form.values.amount} × {form.values.rate} × (1 -{" "}
                {form.values.commission}%)
              </Text>
            </Box>
          </Card>
        </Stepper.Step>

        <Stepper.Step
          label="Детали сделки"
          description="Место и контакты"
          icon={<IconCopyCheck />}
        >
          <Card withBorder>
            <Select
              label="Точка сделки"
              size="lg"
              placeholder="Выберите место проведения"
              value={form.values.locationType}
              onChange={(value) => form.setFieldValue("locationType", value)}
              data={[
                { value: "point", label: "Выбрать из списка" },
                { value: "custom", label: "Произвольный адрес" },
              ]}
              style={{ marginBottom: "15px" }}
            />

            {form.values.locationType === "point" ? (
              <Select
                label="Выберите точку"
                size="lg"
                placeholder="Выберите из списка"
                value={form.values.location}
                onChange={(value) => form.setFieldValue("location", value)}
                data={locations}
                style={{ marginBottom: "15px" }}
              />
            ) : (
              <TextInput
                label="Адрес сделки"
                size="lg"
                placeholder="Введите адрес"
                value={form.values.location}
                onChange={(event) =>
                  form.setFieldValue("location", event.currentTarget.value)
                }
                style={{ marginBottom: "15px" }}
              />
            )}

            <Select
              label="Контакт клиента"
              size="lg"
              placeholder="Способ связи"
              value={form.values.contactType}
              onChange={(value) => form.setFieldValue("contactType", value)}
              data={[
                { value: "telegram", label: "Telegram" },
                { value: "phone", label: "Телефон" },
                { value: "email", label: "Email" },
              ]}
              style={{ marginBottom: "15px" }}
            />

            <TextInput
              label="Контактные данные"
              size="lg"
              placeholder="Введите контакт"
              value={form.values.contact}
              onChange={(event) =>
                form.setFieldValue("contact", event.currentTarget.value)
              }
              style={{ marginBottom: "15px" }}
            />

            <Textarea
              label="Комментарий (необязательно)"
              size="lg"
              placeholder="Дополнительная информация"
              value={form.values.comment}
              onChange={(event) =>
                form.setFieldValue("comment", event.currentTarget.value)
              }
              style={{ marginBottom: "15px" }}
            />
          </Card>
        </Stepper.Step>

        <Stepper.Completed>
          <Card withBorder style={{ marginTop: "20px" }}>
            <Title order={3} style={{ marginBottom: "20px" }}>
              Подтверждение заявки
            </Title>

            <Box style={{ marginBottom: "15px" }}>
              <Text>
                <strong>Тип операции:</strong>{" "}
                {exchangeType === "cryptoToCash"
                  ? "Крипта → Нал"
                  : "Нал → Крипта"}
              </Text>
              <Text>
                <strong>Отдаете:</strong> {form.values.currencyFrom}
              </Text>
              <Text>
                <strong>Получаете:</strong> {form.values.currencyTo}
              </Text>
              <Text>
                <strong>Сумма:</strong> {form.values.amount}
              </Text>
              <Text>
                <strong>Комиссия:</strong> {form.values.commission}%
              </Text>
              <Text>
                <strong>Курс:</strong> {form.values.rate}
              </Text>
              <Text>
                <strong>Итоговая сумма:</strong> {form.values.total}
              </Text>
              <Text>
                <strong>Место сделки:</strong> {form.values.location}
              </Text>
              <Text>
                <strong>Контакт:</strong> {form.values.contact} (
                {form.values.contactType})
              </Text>
              {form.values.comment && (
                <Text style={{ textWrap: "wrap" }}>
                  <strong>Комментарий:</strong> {form.values.comment}
                </Text>
              )}
            </Box>

            <Box
              style={{
                padding: "15px",
                backgroundColor: "#e6f7ff",
                borderRadius: "5px",
              }}
            >
              <Text fw={500}>
                После создания заявка появится в списке заявок или в окне «Мои
                заявки».
              </Text>
            </Box>
          </Card>
        </Stepper.Completed>
      </Stepper>

      <Group mt="15" px={15}>
        {active !== 0 && (
          <Button variant="default" onClick={prevStep} size="lg">
            Назад
          </Button>
        )}
        {active !== 3 ? (
          <Button onClick={nextStep} size="lg">
            Далее
          </Button>
        ) : (
          <Button size="lg">Создать заявку</Button>
        )}
      </Group>
    </Container>
  );
};

export default CreateExchangeRequest;
