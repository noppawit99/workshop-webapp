import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ContactForm } from '@/components/contact-form';

function mockFetchSuccess() {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: async () => ({ success: true }),
  }));
}

function mockFetchError() {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: async () => ({ success: false, message: 'ไม่สามารถส่งข้อความได้ในขณะนี้' }),
  }));
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText('ชื่อ'), { target: { value: 'สมชาย ใจดี' } });
  fireEvent.change(screen.getByLabelText('อีเมล'), { target: { value: 'somchai@example.com' } });
  fireEvent.change(screen.getByLabelText('หัวข้อ'), { target: { value: 'สอบถามสินค้า' } });
  fireEvent.change(screen.getByLabelText('ข้อความ'), { target: { value: 'อยากทราบรายละเอียดของ MacBook Air' } });
}

describe('ContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all fields with labels', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('ชื่อ')).toBeInTheDocument();
    expect(screen.getByLabelText('อีเมล')).toBeInTheDocument();
    expect(screen.getByLabelText('หัวข้อ')).toBeInTheDocument();
    expect(screen.getByLabelText('ข้อความ')).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: 'ส่งข้อความ' }));

    await waitFor(() => {
      expect(screen.getByText('กรุณากรอกชื่อ')).toBeInTheDocument();
      expect(screen.getByText('กรุณากรอกอีเมล')).toBeInTheDocument();
      expect(screen.getByText('กรุณากรอกหัวข้อ')).toBeInTheDocument();
      expect(screen.getByText('กรุณากรอกข้อความ')).toBeInTheDocument();
    });
  });

  it('keeps entered values when validation fails', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('ชื่อ'), { target: { value: 'ส' } });
    fireEvent.click(screen.getByRole('button', { name: 'ส่งข้อความ' }));

    await waitFor(() => {
      expect(screen.getByText('ชื่อต้องมีอย่างน้อย 2 ตัวอักษร')).toBeInTheDocument();
      expect(screen.getByLabelText('ชื่อ')).toHaveValue('ส');
    });
  });

  it('shows success message and sends data to the API', async () => {
    mockFetchSuccess();
    render(<ContactForm />);

    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'ส่งข้อความ' }));

    await waitFor(() => {
      expect(screen.getByText(/ส่งข้อความเรียบร้อยแล้ว/)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, init] = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toMatchObject({
      name: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      subject: 'สอบถามสินค้า',
      message: 'อยากทราบรายละเอียดของ MacBook Air',
    });
  });

  it('shows an error message and keeps values when sending fails', async () => {
    mockFetchError();
    render(<ContactForm />);

    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: 'ส่งข้อความ' }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'ไม่สามารถส่งข้อความได้ในขณะนี้'
      );
    });

    expect(screen.getByLabelText('ชื่อ')).toHaveValue('สมชาย ใจดี');
    expect(screen.getByLabelText('ข้อความ')).toHaveValue('อยากทราบรายละเอียดของ MacBook Air');
  });
});
